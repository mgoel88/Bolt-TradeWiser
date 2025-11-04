import { Router } from 'express';
import { supabase, supabaseAdmin } from '../config/supabase';
import { db } from '../db';
import { userProfiles, tenants } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const router = Router();

// Send OTP to phone number
router.post('/send', async (req, res) => {
  try {
    const schema = z.object({
      phone: z.string().regex(/^\+[1-9]\d{1,14}$/, 'Invalid phone number format. Use E.164 format (e.g., +919876543210)')
    });

    const { phone } = schema.parse(req.body);

    // Send OTP via Supabase Auth
    const { error } = await supabaseAdmin.auth.signInWithOtp({
      phone,
      options: {
        channel: 'sms'
      }
    });

    if (error) {
      console.error('OTP send error:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json({ 
      message: 'OTP sent successfully',
      phone: phone.replace(/(\d{2})\d+(\d{4})/, '$1****$2') // Mask phone number
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Send OTP error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP and complete authentication
router.post('/verify', async (req, res) => {
  try {
    const schema = z.object({
      phone: z.string(),
      otp: z.string().length(6, 'OTP must be 6 digits'),
      fullName: z.string().optional(),
      companyName: z.string().optional()
    });

    const { phone, otp, fullName, companyName } = schema.parse(req.body);

    // Verify OTP with Supabase
    const { data, error } = await supabaseAdmin.auth.verifyOtp({
      phone,
      token: otp,
      type: 'sms'
    });

    if (error || !data.user) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    const user = data.user;

    // Check if user profile exists
    let userProfile = await db.query.userProfiles.findFirst({
      where: eq(userProfiles.id, user.id)
    });

    // If new user, create tenant and profile
    if (!userProfile) {
      // Create tenant
      const [tenant] = await db.insert(tenants).values({
        name: companyName || 'My Company',
        domain: `phone-${phone.replace(/\D/g, '')}.tradewiser.in`,
        subscriptionTier: 'free',
        subscriptionStatus: 'active'
      }).returning();

      // Create user profile
      [userProfile] = await db.insert(userProfiles).values({
        id: user.id,
        tenantId: tenant.id,
        fullName: fullName || phone,
        phone: phone,
        role: 'admin', // First user is admin
        appPermissions: {
          pricing_tool: true,
          logistics: true,
          warehousing: true
        }
      }).returning();
    }

    // Generate JWT tokens
    const { generateAccessToken, generateRefreshToken } = await import('../utils/jwt');
    
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email || `${phone}@phone.tradewiser.in`,
      tenantId: userProfile.tenantId,
      role: userProfile.role,
      appPermissions: userProfile.appPermissions as any
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email || `${phone}@phone.tradewiser.in`,
      tenantId: userProfile.tenantId
    });

    // Set cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      user: {
        id: user.id,
        phone: phone,
        fullName: userProfile.fullName,
        role: userProfile.role,
        tenantId: userProfile.tenantId,
        appPermissions: userProfile.appPermissions
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

export default router;
