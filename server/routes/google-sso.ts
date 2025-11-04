import { Router } from 'express';
import { supabase, supabaseAdmin } from '../config/supabase';
import { db } from '../db';
import { userProfiles, tenants } from '@shared/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// Initiate Google OAuth flow
router.get('/login', async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.APP_URL || 'https://tradewiser.in'}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ url: data.url });
  } catch (error) {
    console.error('Google SSO error:', error);
    res.status(500).json({ error: 'Failed to initiate Google sign-in' });
  }
});

// Handle OAuth callback
router.post('/callback', async (req, res) => {
  try {
    const { access_token, refresh_token } = req.body;

    // Get user from Supabase
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(access_token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Check if user profile exists
    let userProfile = await db.query.userProfiles.findFirst({
      where: eq(userProfiles.id, user.id)
    });

    // If new user, create tenant and profile
    if (!userProfile) {
      // Extract company domain from email
      const emailDomain = user.email?.split('@')[1] || 'unknown.com';
      const companyName = emailDomain.split('.')[0].charAt(0).toUpperCase() + 
                         emailDomain.split('.')[0].slice(1);

      // Create tenant
      const [tenant] = await db.insert(tenants).values({
        name: companyName,
        domain: emailDomain,
        subscriptionTier: 'free',
        subscriptionStatus: 'active'
      }).returning();

      // Create user profile
      [userProfile] = await db.insert(userProfiles).values({
        id: user.id,
        tenantId: tenant.id,
        fullName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        role: 'admin', // First user is admin
        appPermissions: {
          pricing_tool: true,
          logistics: true,
          warehousing: true
        }
      }).returning();
    }

    // Generate JWT tokens (reuse logic from auth.ts)
    const { generateAccessToken, generateRefreshToken } = await import('../utils/jwt');
    
    const accessTokenJWT = generateAccessToken({
      userId: user.id,
      email: user.email!,
      tenantId: userProfile.tenantId,
      role: userProfile.role,
      appPermissions: userProfile.appPermissions as any
    });

    const refreshTokenJWT = generateRefreshToken({
      userId: user.id,
      email: user.email!,
      tenantId: userProfile.tenantId
    });

    // Set cookies
    res.cookie('accessToken', accessTokenJWT, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refreshToken', refreshTokenJWT, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: userProfile.fullName,
        role: userProfile.role,
        tenantId: userProfile.tenantId,
        appPermissions: userProfile.appPermissions
      }
    });
  } catch (error) {
    console.error('Google callback error:', error);
    res.status(500).json({ error: 'Failed to complete Google sign-in' });
  }
});

export default router;
