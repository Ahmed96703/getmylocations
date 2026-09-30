---
name: seo-optimizer
description: Audits a production page via MCP and edits the codebase to resolve errors.
user_invocable: true
---
## Step 1: Audit page
Use the Ryze or Semrush MCP tool to check the live optimization score and backlink anchor keywords for our target landing page.

## Step 2: Implement Fixes
Review the local component file (e.g., `src/app/page.tsx`). Modify the Next.js `metadata` object or layout elements to fix missing canonical tags, optimize H1 hierarchy, or address alt tags based on the audit report.

## Step 3: Verify and Test
Run `npm run build` or `npm test` locally to ensure no layout code breaks.
