# Cloudflare Pages Deployment Guide

This project is configured for deployment on Cloudflare Pages with Next.js SSR support.

## Configuration Status

✅ **Already Configured:**
- `@cloudflare/next-on-pages` package installed
- `wrangler.toml` configuration file 
- `next.config.ts` with Cloudflare setup
- Package.json scripts for Cloudflare deployment 
- Environment variables setup

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI**: Install globally with `npm install -g wrangler`
3. **Git Repository**: Connect your repo to Cloudflare Pages

## Environment Variables

Create a `.env.local` file (already created) with:

```env
# Resort Configuration
NEXT_PUBLIC_RESORT_ID=1

# Supabase Configuration (add your actual values)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment Options

### Option 1: GitHub/GitLab Integration (Recommended)

1. Connect your repository to Cloudflare Pages
2. Set build command: `npm run pages:build`
3. Set output directory: `.vercel/output/static`
4. Deploy automatically on git push

### Option 2: CLI Deployment

**Note**: On Windows, you may need to use WSL (Windows Subsystem for Linux) for the build process.

```bash
# Login to Cloudflare
npx wrangler login

# Build for Cloudflare Pages
npm run pages:build

# Deploy to Cloudflare Pages
npm run deploy
```

### Option 3: Manual Build (Windows)

If you encounter issues with the automated build on Windows:

1. Build the Next.js app:
   ```bash
   npm run build
   ```

2. Upload the `.next` folder to Cloudflare Pages manually
3. Or use the Cloudflare dashboard to deploy

## Build Scripts

- `npm run build` - Standard Next.js build
- `npm run pages:build` - Build for Cloudflare Pages
- `npm run preview` - Local preview with Cloudflare runtime
- `npm run deploy` - Deploy to Cloudflare Pages

## Configuration Files

### wrangler.toml
```toml
name = "resorts"
compatibility_date = "2024-12-19"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".vercel/output/static"
```

### next.config.ts
The config includes:
- Cloudflare development platform setup
- Image optimization settings
- Remote pattern configurations

## Troubleshooting

### Windows Build Issues
If you encounter bash/shell issues on Windows:
1. Use WSL (Windows Subsystem for Linux)
2. Or deploy via GitHub integration
3. Or build on a Unix-based system

### Environment Variables
Make sure all required environment variables are set in:
- `.env.local` for local development
- Cloudflare Pages dashboard for production

### Build Errors
1. Check Node.js version compatibility
2. Verify all dependencies are installed
3. Ensure environment variables are properly set

## Important Notes

1. **Edge Runtime**: Your pages use `"use client"` directive, so no Edge runtime configuration is needed
2. **Static Assets**: Images and static files are optimized for Cloudflare's CDN
3. **Database**: Ensure Supabase credentials are configured in production

## Next Steps

1. Set up your Supabase project
2. Configure environment variables
3. Test the build process
4. Deploy to Cloudflare Pages

For more information, visit the [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/).