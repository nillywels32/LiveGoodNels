# 🚀 Deploy GoodLifeNels Web App to Vercel

## Overview

Vercel will host your Next.js web app with automatic deployments from GitHub.

**Cost:** FREE (Hobby tier is perfect for this project)

---

## Step 1: Connect GitHub to Vercel

1. **Go to Vercel:** https://vercel.com/new

2. **Sign in with GitHub** (use your nillywels32 account)

3. **Import Repository:**
   - Click "Import Project"
   - Select "Import Git Repository"
   - Find: `nillywels32/LiveGoodNels`
   - Click "Import"

---

## Step 2: Configure Project

### Project Settings:

- **Framework Preset:** Next.js (auto-detected ✅)
- **Root Directory:** `apps/web`
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install`

### Environment Variables:

Click "Environment Variables" and add these:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://rnnkhpuwdqtoavpflrdw.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubmtocHV3ZHF0b2F2cGZscmR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjg5MzUsImV4cCI6MjA3ODgwNDkzNX0.qErQrvpLRMIIHsX9DDTGzMpALU0XwhY65RSFpnhIcmU

SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

ANTHROPIC_API_KEY=your-anthropic-api-key
```

**Important:** Add these for all environments (Production, Preview, Development)

---

## Step 3: Deploy

1. Click **Deploy**

2. Wait 2-3 minutes for build to complete

3. You'll get a URL like: `https://livegoodne-ls.vercel.app`

4. **Visit your live app!** 🎉

---

## Step 4: Automatic Deployments

Now every time you push to GitHub:
- **Main branch** → Deploys to production
- **Other branches** → Creates preview deployments

```bash
# Make changes
git add .
git commit -m "Add new feature"
git push

# Vercel automatically deploys!
```

---

## Vercel vs. Local Development

### Local Development (What You're Doing Now)
```bash
cd apps/web
npm run dev
# Visit: http://localhost:3000
```

**Use for:** Building features, testing, debugging

### Vercel Production
```
https://your-app.vercel.app
```

**Use for:**
- Sharing with family
- Testing on real devices
- Production use

---

## Benefits of Vercel

✅ **Automatic deployments** from GitHub
✅ **Free SSL** (HTTPS)
✅ **Global CDN** (fast worldwide)
✅ **Preview deployments** for every branch
✅ **Analytics** (see who's using the app)
✅ **Zero configuration** for Next.js
✅ **Unlimited bandwidth** on free tier
✅ **Custom domain** support (buy goodlifenels.com!)

---

## Troubleshooting

### Build Fails

**Error:** "Module not found"
**Fix:** Make sure `package.json` has all dependencies

**Error:** "Environment variable missing"
**Fix:** Add all env vars in Vercel dashboard

### App Loads But Supabase Doesn't Work

**Fix:** Check that you deployed the database schema to Supabase first

### Want Custom Domain?

1. Buy domain (like goodlifenels.com)
2. In Vercel: Settings → Domains
3. Add domain and follow DNS instructions

---

## What About Mobile App?

Mobile app (React Native) **cannot** be deployed to Vercel. Options:

1. **Expo Go** (Development) - Current setup ✅
2. **Expo EAS Build** (TestFlight/App Store) - When ready for family
3. **Apple App Store** (Production) - Requires $99/year Apple Developer

For now, use Expo Go on your phone!

---

## Cost Breakdown

| Service | What It Does | Cost |
|---------|--------------|------|
| **Vercel** | Web app hosting | FREE |
| **Supabase** | Database + Auth | FREE |
| **Anthropic** | AI meal planning | ~$6-8/month |
| **GitHub** | Code storage | FREE |
| **Total** | | **~$6-8/month** |

---

## Next Steps After Vercel Deploy

1. ✅ Deploy web app to Vercel
2. ✅ Test on real URL
3. ✅ Share link with family to test
4. 🔜 Build Phase 1 features (auth, questionnaire, meal plans)
5. 🔜 Eventually: Deploy mobile app to TestFlight

---

**Ready to deploy?** Just follow Step 1 above! 🚀
