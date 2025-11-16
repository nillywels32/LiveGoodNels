# Dependency Installation Instructions

Due to workspace configuration in the monorepo, you may encounter dependency resolution issues when running `npm install`. Here are the workaround steps:

## Required Dependencies

The following dependencies have been added to `package.json` but need to be installed:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.45.0",
    "@tanstack/react-query": "^5.59.0",
    "framer-motion": "^11.11.0",
    "react-hook-form": "^7.53.0",
    "zustand": "^5.0.0"
  }
}
```

Additionally, you'll need for server-side rendering:
```bash
npm install @supabase/ssr
```

## Installation Methods

### Method 1: Install from Root (Recommended)

```bash
# From the project root directory
cd ../..
npm install --workspace=apps/web
```

### Method 2: Force Install

If Method 1 fails, try:

```bash
cd apps/web
npm install --legacy-peer-deps
```

### Method 3: Manual Package Installation

If both methods above fail, install each package individually:

```bash
cd apps/web
npm install @supabase/supabase-js --legacy-peer-deps
npm install @supabase/ssr --legacy-peer-deps
npm install zustand --legacy-peer-deps
npm install @tanstack/react-query --legacy-peer-deps
npm install react-hook-form --legacy-peer-deps
npm install framer-motion --legacy-peer-deps
```

### Method 4: Temporarily Disable Workspaces

As a last resort, you can temporarily comment out the workspace configuration:

1. Edit the root `package.json`
2. Comment out the `"workspaces"` field
3. Run `npm install` in `apps/web`
4. Uncomment the `"workspaces"` field after installation

## Known Issues

### Error: Invalid Version

If you see `npm error Invalid Version:`, this is likely due to:
- A conflicting dependency in the mobile app workspace
- Corrupted npm cache

**Solution:**
1. Clear npm cache: `npm cache clean --force`
2. Delete all `node_modules` folders and `package-lock.json` files
3. Try Method 1 again

### Error: ETARGET No matching version

This usually indicates a package version that doesn't exist. Check:
- The mobile app's `package.json` for invalid version ranges
- Your npm version: `npm --version` (should be 9.0.0+)

## Verifying Installation

After installation, verify all packages are installed:

```bash
npm list @supabase/supabase-js
npm list zustand
npm list @tanstack/react-query
npm list react-hook-form
npm list framer-motion
```

## Alternative: Use Yarn or pnpm

If npm continues to cause issues, you can try using yarn or pnpm:

```bash
# Using yarn
yarn install

# Using pnpm
pnpm install
```

Note: You'll need to create corresponding lock files for these package managers.

## Next Steps After Installation

Once dependencies are installed:

1. Set up your `.env.local` file (see `.env.example`)
2. Run the development server: `npm run dev`
3. Visit http://localhost:3000

If you continue to have issues, please refer to SETUP.md or open an issue.
