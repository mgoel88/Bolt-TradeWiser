-- Migration: Fix Function Search Path Security Issue
-- Date: 2025-11-12
-- Description: Updates update_updated_at_column function to explicitly set search_path
--              to prevent potential SQL injection attacks

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
