# 🚀 Quick Deployment Commands

## One-Time Setup

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase Hosting
firebase init hosting
```

**When prompted:**
- Public directory: `build`
- Single-page app: `Yes`
- Overwrite index.html: `No`

## Deploy Your Site

### Option 1: Use the Script (Windows)

```bash
deploy-to-firebase.bat
```

### Option 2: Manual Commands

```bash
# Build the app
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

## Update Your Site

```bash
# After making changes
npm run build
firebase deploy --only hosting
```

## Check Deployment Status

```bash
# View hosting info
firebase hosting:channel:list

# View site URL
firebase hosting:sites:list
```

## Rollback (if needed)

```bash
# List previous deployments
firebase hosting:clone

# Rollback to previous version
firebase hosting:rollback
```

## Your URLs

- **Backend API**: `https://sylo-ai-backend.mrsachin18k.workers.dev`
- **Frontend**: Will be `https://YOUR-PROJECT.web.app` after deployment

## Quick Checklist

Before deploying:
- [ ] Backend is deployed and working
- [ ] `.env` has correct backend URL
- [ ] All features tested locally
- [ ] No console errors
- [ ] Build completes successfully

After deploying:
- [ ] Visit your live site
- [ ] Test signup/login
- [ ] Test chat functionality
- [ ] Test on mobile
- [ ] Check browser console

## Common Issues

**Build fails:**
```bash
rm -rf node_modules build
npm install
npm run build
```

**Deployment fails:**
```bash
firebase login --reauth
firebase deploy --only hosting
```

**Site not updating:**
- Clear browser cache (Ctrl+Shift+R)
- Wait 1-2 minutes for CDN to update
- Check Firebase Console for deployment status

---

**Ready to deploy? Run:** `deploy-to-firebase.bat` or `npm run build && firebase deploy --only hosting`
