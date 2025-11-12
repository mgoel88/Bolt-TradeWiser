-- Migration: Optimize RLS Policies for User Profiles Table
-- Date: 2025-11-12
-- Description: Wraps auth functions in (select ...) and consolidates policies
--              for better performance and clearer security rules

-- Drop all existing user_profiles policies
DROP POLICY IF EXISTS "Users can view same tenant profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can manage tenant users" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can view tenant profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can insert tenant users" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can delete tenant users" ON public.user_profiles;

-- Create single consolidated SELECT policy
CREATE POLICY "Users can view tenant profiles" ON public.user_profiles
FOR SELECT TO authenticated
USING (tenant_id = (select (auth.jwt() ->> 'tenant_id')::uuid));

-- Create single consolidated UPDATE policy  
CREATE POLICY "Users can update profiles" ON public.user_profiles
FOR UPDATE TO authenticated
USING (
  id = (select auth.uid())
  OR (
    tenant_id = (select (auth.jwt() ->> 'tenant_id')::uuid)
    AND (select (auth.jwt() ->> 'role')::text) = 'admin'
  )
);

-- Create admin-only INSERT policy
CREATE POLICY "Admins can insert tenant users" ON public.user_profiles
FOR INSERT TO authenticated
WITH CHECK (
  tenant_id = (select (auth.jwt() ->> 'tenant_id')::uuid)
  AND (select (auth.jwt() ->> 'role')::text) = 'admin'
);

-- Create admin-only DELETE policy
CREATE POLICY "Admins can delete tenant users" ON public.user_profiles
FOR DELETE TO authenticated
USING (
  tenant_id = (select (auth.jwt() ->> 'tenant_id')::uuid)
  AND (select (auth.jwt() ->> 'role')::text) = 'admin'
);
