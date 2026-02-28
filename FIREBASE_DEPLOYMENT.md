# 🚀 Firebase Hosting Deployment Guide

Complete guide to deploy your Sylo AI website to Firebase Hosting.

## ✅ Pre-Deployment Checklist

### 1. Backend Status
- ✅ Backend deployed to Cloudflare Workers
- ✅ URL: `https://sylo-ai-backend.mrsachin18k.workers.dev`
- ✅ All secrets configured (OpenRouter, Firebase)
- ✅ API endpoints working

### 2. Frontend Status
- ✅ All components working
- ✅ No diagnostic errors
- ✅ Environment variables configured
- ✅ Backend URL in `.env`

### 3. Security Checks
- ✅ API keys stored as secrets (not in code)
- ✅ `.gitignore` configured
- ✅ Firebase security rules set
- ✅ CORS configured

## 📋 Step-by-Step Deployment

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

This will open a browser window to authenticate.

### Step 3: Initialize Firebase Hosting

```bash
firebase init hosting
```

**Answer the prompts:**

1. **Select Firebase project**: Choose your existing project (the one you created earlier)
2. **What do you want to use as your public directory?**: `build`
3. **Configure as a single-page app?**: `Yes`
4. **Set up automatic builds with GitHub?**: `No` (for now)
5. **Overwrite build/index.html?**: `No`

### Step 4: Build Your React App

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Step 5: Deploy to Firebase

```bash
firebase deploy --only hosting
```

### Step 6: Get Your Live URL

After deployment, you'll see:
```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/YOUR-PROJECT/overview
Hosting URL: https://YOUR-PROJECT.web.app
```

**Copy your Hosting URL!**

## 🔧 Post-Deployment Configuration

### Update CORS in Backend (if needed)

If you want to restrict API access to only your domain:

1. Edit `backend/src/index.js`:

```javascript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://YOUR-PROJECT.web.app',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
```

2. Redeploy backend:
```bash
cd backend
npm run deploy
```

### Update Environment Variables (Optional)

If you want different settings for production:

1. Create `.env.production`:
```
REACT_APP_API_URL=https://sylo-ai-backend.mrsachin18k.workers.dev
```

2. Rebuild and redeploy:
```bash
npm run build
firebase deploy --only hosting
```

## 🔐 Security Best Practices

### 1. Firebase Security Rules

Make sure your Firestore rules are set:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      match /history/{sessionId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

### 2. Environment Variables

Never commit these files:
- `.env`
- `.env.local`
- `.env.production`
- `backend/.env`

They're already in `.gitignore` ✅

### 3. API Keys

All sensitive keys are stored as:
- Cloudflare Worker secrets (backend)
- Environment variables (frontend)
- Never in source code ✅

## 📊 Monitoring Your Deployment

### Firebase Console
- **Hosting**: https://console.firebase.google.com/project/YOUR-PROJECT/hosting
- **Authentication**: Check user signups
- **Firestore**: Monitor database usage
- **Usage**: Track bandwidth and storage

### Cloudflare Dashboard
- **Workers**: https://dash.cloudflare.com/
- **Analytics**: View API requests
- **Logs**: `wrangler tail` for real-time logs

### OpenRouter Dashboard
- **Usage**: https://openrouter.ai/activity
- **Monitor**: API calls and costs

## 🔄 Updating Your Site

When you make changes:

```bash
# 1. Make your changes
# 2. Test locally
npm start

# 3. Build
npm run build

# 4. Deploy
firebase deploy --only hosting
```

## 🌐 Custom Domain (Optional)

### Add Your Own Domain

1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Enter your domain (e.g., `sylo-ai.com`)
4. Follow DNS configuration steps
5. Wait for SSL certificate (automatic)

### Update Backend CORS

After adding custom domain, update CORS:

```javascript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://sylo-ai.com',
  // ...
};
```

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules build
npm install
npm run build
```

### Deployment Fails

```bash
# Check Firebase login
firebase login --reauth

# Try deploying again
firebase deploy --only hosting
```

### Site Not Loading

1. Check browser console for errors
2. Verify `.env` has correct backend URL
3. Check Firebase Hosting URL is correct
4. Clear browser cache

### API Not Working

1. Check backend is deployed: Visit `https://sylo-ai-backend.mrsachin18k.workers.dev/api/chat`
2. Check CORS headers
3. Verify secrets are set: `wrangler secret list`

## 📈 Performance Optimization

### Already Optimized ✅

- React production build (minified)
- Code splitting
- Lazy loading
- Image optimization
- Firebase CDN (global)
- Cloudflare edge network

### Additional Optimizations

1. **Enable Caching**:
   - Firebase Hosting automatically caches static assets
   - CDN serves from nearest location

2. **Compress Images**:
   - Already using WebP format ✅
   - GIF is optimized ✅

3. **Monitor Performance**:
   - Use Lighthouse in Chrome DevTools
   - Check Firebase Performance Monitoring

## 💰 Cost Tracking

### Free Tier Limits

**Firebase Hosting:**
- 10 GB storage
- 360 MB/day bandwidth
- Custom domain included

**Cloudflare Workers:**
- 100,000 requests/day

**Firebase Firestore:**
- 50,000 reads/day
- 20,000 writes/day

**OpenRouter:**
- Free with rate limits

### Set Up Billing Alerts

1. Firebase Console > Usage and billing
2. Set budget alerts
3. Monitor daily usage

## ✅ Final Checklist

Before going live:

- [ ] Backend deployed and working
- [ ] Frontend built successfully
- [ ] Firebase Hosting deployed
- [ ] Test signup/login
- [ ] Test chat functionality
- [ ] Test history saving
- [ ] Check mobile responsiveness
- [ ] Verify all images load
- [ ] Test on different browsers
- [ ] Check console for errors
- [ ] Monitor initial traffic

## 🎉 You're Live!

Your Sylo AI is now deployed and accessible worldwide!

**Share your site:**
- Direct link: `https://YOUR-PROJECT.web.app`
- Custom domain: `https://your-domain.com` (if configured)

**Monitor and maintain:**
- Check Firebase Console regularly
- Monitor Cloudflare Workers usage
- Review OpenRouter API usage
- Update dependencies monthly
- Backup Firestore data

## 🆘 Need Help?

1. Check Firebase documentation: https://firebase.google.com/docs/hosting
2. Cloudflare Workers docs: https://developers.cloudflare.com/workers/
3. Review `TROUBLESHOOTING.md` in this project
4. Check browser console for errors
5. View backend logs: `wrangler tail`

---

**Congratulations on deploying your AI chat application! 🚀**
