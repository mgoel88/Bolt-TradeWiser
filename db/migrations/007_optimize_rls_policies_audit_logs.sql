-- Migration: Optimize RLS Policies for Audit Logs Table
-- Date: 2025-11-12
-- Description: Wraps auth functions in (select ...) for better performance

-- Drop existing audit_logs policy
DROP POLICY IF EXISTS "Admins can view tenant audit logs" ON public.audit_logs;

-- Recreate with optimized query
CREATE POLICY "Admins can view tenant audit logs" ON public.audit_logs
FOR SELECT TO authenticated
USING (
  tenant_id = (select (auth.jwt() ->> 'tenant_id')::uuid)
  AND (select (auth.jwt() ->> 'role')::text) = 'admin'
);
