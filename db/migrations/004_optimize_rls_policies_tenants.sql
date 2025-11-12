-- Migration: Optimize RLS Policies for Tenants Table
-- Date: 2025-11-12
-- Description: Wraps auth.jwt() calls in (select ...) for 10-100x performance improvement
--              Prevents re-evaluation of auth functions for each row

-- Drop and recreate tenants policies with optimized queries
DROP POLICY IF EXISTS "Users can view own tenant" ON public.tenants;

CREATE POLICY "Users can view own tenant" ON public.tenants
FOR SELECT TO authenticated
USING (id = (select (auth.jwt() ->> 'tenant_id')::uuid));
