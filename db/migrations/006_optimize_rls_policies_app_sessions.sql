-- Migration: Optimize RLS Policies for App Sessions Table
-- Date: 2025-11-12
-- Description: Wraps auth functions in (select ...) and consolidates policies
--              for better performance

-- Drop existing app_sessions policies
DROP POLICY IF EXISTS "Users can view own sessions" ON public.app_sessions;
DROP POLICY IF EXISTS "Users can create own sessions" ON public.app_sessions;
DROP POLICY IF EXISTS "Admins can view tenant sessions" ON public.app_sessions;
DROP POLICY IF EXISTS "Users can view sessions" ON public.app_sessions;

-- Create consolidated SELECT policy
CREATE POLICY "Users can view sessions" ON public.app_sessions
FOR SELECT TO authenticated
USING (
  user_id = (select auth.uid())
  OR (
    tenant_id = (select (auth.jwt() ->> 'tenant_id')::uuid)
    AND (select (auth.jwt() ->> 'role')::text) = 'admin'
  )
);

-- Create INSERT policy
CREATE POLICY "Users can create own sessions" ON public.app_sessions
FOR INSERT TO authenticated
WITH CHECK (user_id = (select auth.uid()));
