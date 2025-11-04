import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://uveqjhwrhvjakuyisjtm.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2ZXFqaHdyaHZqYWt1eWlzanRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxOTMzNDcsImV4cCI6MjA3Nzc2OTM0N30.7MWteA1H75orHq_An1WvN3yCTmGLljJ4z3CJK-mGTyE';

// For admin operations (use service role key)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export { supabaseUrl, supabaseAnonKey };
