import { Router } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { z } from 'zod';

const router = Router();

// Request password reset
router.post('/request', async (req, res) => {
  try {
    const schema = z.object({
      email: z.string().email()
    });

    const { email } = schema.parse(req.body);

    // Send password reset email via Supabase
    const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.APP_URL || 'https://tradewiser.in'}/reset-password`
    });

    if (error) {
      console.error('Password reset error:', error);
      // Don't reveal if email exists or not for security
      return res.json({ 
        message: 'If an account exists with this email, you will receive a password reset link.' 
      });
    }

    res.json({ 
      message: 'If an account exists with this email, you will receive a password reset link.' 
    });
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(400).json({ error: 'Invalid request' });
  }
});

// Update password with reset token
router.post('/update', async (req, res) => {
  try {
    const schema = z.object({
      token: z.string(),
      newPassword: z.string().min(8)
    });

    const { token, newPassword } = schema.parse(req.body);

    // Verify the token and update password
    const { data, error } = await supabaseAdmin.auth.updateUser({
      password: newPassword
    });

    if (error) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password update error:', error);
    res.status(400).json({ error: 'Invalid request' });
  }
});

export default router;
