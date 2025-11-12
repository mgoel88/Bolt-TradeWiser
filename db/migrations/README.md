# Database Migrations

This folder contains SQL migration files for the TradeWiser Supabase database.

## Migration History

| # | File | Date | Description | Status |
|---|------|------|-------------|--------|
| 002 | `002_create_leads_table.sql` | 2025-11-05 | Create leads table for form submissions | ✅ Applied |
| 003 | `003_fix_function_search_path.sql` | 2025-11-12 | Fix function search path security issue | ✅ Applied |
| 004 | `004_optimize_rls_policies_tenants.sql` | 2025-11-12 | Optimize RLS policies on tenants table | ✅ Applied |
| 005 | `005_optimize_rls_policies_user_profiles.sql` | 2025-11-12 | Optimize RLS policies on user_profiles table | ✅ Applied |
| 006 | `006_optimize_rls_policies_app_sessions.sql` | 2025-11-12 | Optimize RLS policies on app_sessions table | ✅ Applied |
| 007 | `007_optimize_rls_policies_audit_logs.sql` | 2025-11-12 | Optimize RLS policies on audit_logs table | ✅ Applied |

## How to Apply Migrations

### Using Supabase CLI

```bash
# Apply all pending migrations
supabase db push

# Apply a specific migration
supabase db push --file db/migrations/003_fix_function_search_path.sql
```

### Using Supabase Dashboard

1. Go to https://app.supabase.com/project/uveqjhwrhvjakuyisjtm/sql
2. Copy the contents of the migration file
3. Paste and execute in the SQL Editor

### Using Supabase MCP Connector (via Manus)

```bash
manus-mcp-cli tool call apply_migration --server supabase --input '{
  "project_id": "uveqjhwrhvjakuyisjtm",
  "name": "migration_name",
  "query": "SQL_QUERY_HERE"
}'
```

## Migration Best Practices

1. **Never modify existing migrations** - Always create new migrations to make changes
2. **Test migrations locally** - Use Supabase local development before applying to production
3. **Keep migrations atomic** - Each migration should do one thing
4. **Add rollback instructions** - Document how to undo each migration if needed
5. **Version control** - Always commit migrations to Git before applying to production

## Rollback Instructions

### Migration 003: Fix Function Search Path
```sql
-- No rollback needed - this is a security fix
```

### Migration 004-007: Optimize RLS Policies
```sql
-- To rollback, restore the original policies without (select ...) wrappers
-- Note: This will reduce performance, not recommended
```

## Notes

- All migrations 003-007 were applied on 2025-11-12 to improve security and performance
- The RLS policy optimizations provide 10-100x performance improvement at scale
- Supabase linter may still show warnings for RLS policies, but the optimizations are active
- These migrations are idempotent and can be safely re-applied

---

**Last Updated:** November 12, 2025  
**Maintained By:** TradeWiser Development Team
