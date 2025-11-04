import express, { Request, Response } from 'express';
import { supabase, supabaseAdmin } from '../config/supabase';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, TokenPayload } from '../utils/jwt';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Register new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, fullName, companyName, phone } = req.body;

    // Validate input
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'Email, password, and full name are required' });
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company_name: companyName,
          phone
        }
      }
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    if (!authData.user) {
      return res.status(400).json({ error: 'Failed to create user' });
    }

    // Create tenant for the new user
    const { data: tenantData, error: tenantError } = await supabaseAdmin
      .from('tenants')
      .insert({
        name: companyName || `${fullName}'s Organization`,
        domain: email.split('@')[1],
        subscription_tier: 'free',
        subscription_status: 'active'
      })
      .select()
      .single();

    if (tenantError || !tenantData) {
      console.error('Tenant creation error:', tenantError);
      return res.status(500).json({ error: 'Failed to create tenant' });
    }

    // Create user profile
    const { error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .insert({
        id: authData.user.id,
        tenant_id: tenantData.id,
        full_name: fullName,
        role: 'admin', // First user is admin
        phone,
        app_permissions: {
          pricing_tool: true,
          logistics: true,
          warehousing: true
        },
        is_active: true
      });

    if (profileError) {
      console.error('Profile creation error:', profileError);
      return res.status(500).json({ error: 'Failed to create user profile' });
    }

    // Generate tokens
    const tokenPayload: TokenPayload = {
      userId: authData.user.id,
      email: authData.user.email!,
      tenantId: tenantData.id,
      role: 'admin',
      appPermissions: {
        pricing_tool: true,
        logistics: true,
        warehousing: true
      }
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

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
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        fullName,
        tenantId: tenantData.id,
        role: 'admin'
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Sign in with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError || !authData.user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .select('*, tenants(*)')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    if (!profile.is_active) {
      return res.status(403).json({ error: 'Account is inactive' });
    }

    // Update last login
    await supabaseAdmin
      .from('user_profiles')
      .update({ last_login: new Date().toISOString() })
      .eq('id', authData.user.id);

    // Create app session
    await supabaseAdmin
      .from('app_sessions')
      .insert({
        user_id: authData.user.id,
        tenant_id: profile.tenant_id,
        app_name: 'tradewiser_hub',
        ip_address: req.ip,
        user_agent: req.headers['user-agent']
      });

    // Generate tokens
    const tokenPayload: TokenPayload = {
      userId: authData.user.id,
      email: authData.user.email!,
      tenantId: profile.tenant_id,
      role: profile.role,
      appPermissions: profile.app_permissions
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Set cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        fullName: profile.full_name,
        tenantId: profile.tenant_id,
        role: profile.role,
        appPermissions: profile.app_permissions
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Refresh token
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token required' });
    }

    const payload = verifyRefreshToken(refreshToken);

    if (!payload) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Get latest user profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('id', payload.userId)
      .single();

    if (profileError || !profile || !profile.is_active) {
      return res.status(401).json({ error: 'User not found or inactive' });
    }

    // Generate new tokens
    const tokenPayload: TokenPayload = {
      userId: profile.id,
      email: payload.email,
      tenantId: profile.tenant_id,
      role: profile.role,
      appPermissions: profile.app_permissions
    };

    const newAccessToken = generateAccessToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000
    });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout
router.post('/logout', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    // Clear cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    // Sign out from Supabase
    await supabase.auth.signOut();

    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { data: profile, error } = await supabaseAdmin
      .from('user_profiles')
      .select('*, tenants(*)')
      .eq('id', req.user.userId)
      .single();

    if (error || !profile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    res.json({
      success: true,
      user: {
        id: profile.id,
        email: req.user.email,
        fullName: profile.full_name,
        tenantId: profile.tenant_id,
        role: profile.role,
        appPermissions: profile.app_permissions,
        tenant: profile.tenants
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
