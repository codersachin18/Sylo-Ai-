# Simple Deployment Steps

Follow these steps to deploy your Sylo AI application.

## 🔥 Quick Deploy (Windows)

```bash
cd backend
deploy.bat
```

This script will:
1. Check if Wrangler is installed
2. Login to Cloudflare
3. Set up secrets (including your OpenRouter API key)
4. Deploy the backend
5. Show you the Worker URL

## 📝 Manual Deployment

### Step 1: Install Wrangler

```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

This opens a browser window to authenticate.

### Step 3: Set Secrets

```bash
cd backend

# Set OpenRouter API Key (already provided)
wrangler secret put OPENROUTER_API_KEY
# Paste: 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

# Set Firebase API Key
wrangler secret put FIREBASE_API_KEY
# Paste your Firebase API key

# Set Firebase Project ID
wrangler secret put FIREBASE_PROJECT_ID
# Paste your Firebase project ID
```

### Step 4: Deploy Backend

```bash
npm run deploy
```

You'll see output like:
```
Published sylo-ai-backend (1.23 sec)
  https://sylo-ai-backend.YOUR-SUBDOMAIN.workers.dev
```

**Copy this URL!**

### Step 5: Update Frontend

Edit `.env` in the root directory:

```
REACT_APP_API_URL=https://sylo-ai-backend.YOUR-SUBDOMAIN.workers.dev
```

### Step 6: Test Locally

```bash
npm start
```

Visit http://localhost:3000 and test:
1. Send a chat message (should work without login)
2. Sign up for an account
3. Send messages (history should save)
4. Refresh page (history should load)

### Step 7: Deploy Frontend

Choose one:

#### Option A: Vercel
```bash
npm install -g vercel
vercel
```

#### Option B: Netlify
```bash
npm run build
# Upload 'build' folder to Netlify
```

#### Option C: Cloudflare Pages
```bash
npm run build
wrangler pages publish build
```

## ✅ Verify Deployment

### Test Backend

```bash
# Test chat endpoint
curl -X POST https://your-worker.workers.dev/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"Hello\",\"model\":\"Sylo Gen-6.7\"}"
```

Should return an AI response.

### Check Logs

```bash
cd backend
wrangler tail
```

This shows real-time logs from your Worker.

### Check Secrets

```bash
cd backend
wrangler secret list
```

Should show:
- OPENROUTER_API_KEY
- FIREBASE_API_KEY
- FIREBASE_PROJECT_ID

## 🔧 Update Deployment

If you make changes:

```bash
# Backend changes
cd backend
npm run deploy

# Frontend changes
npm run build
# Redeploy to your hosting platform
```

## 🐛 Troubleshooting

### "Unauthorized" Error
- Check secrets are set: `wrangler secret list`
- Verify Firebase API key is correct

### "Failed to send message"
- Check OpenRouter API key is set
- View logs: `wrangler tail`
- Check usage: https://openrouter.ai/activity

### CORS Errors
- Make sure backend is deployed
- Check .env has correct Worker URL
- Verify CORS headers in backend/src/index.js

### Deployment Fails
- Check you're logged in: `wrangler whoami`
- Update Wrangler: `npm install -g wrangler@latest`
- Check wrangler.toml syntax

## 📊 Monitor Usage

### Cloudflare Dashboard
- Workers: https://dash.cloudflare.com/
- View requests, errors, CPU time

### Firebase Console
- Authentication: See registered users
- Firestore: View stored data
- Usage: Monitor reads/writes

### OpenRouter Dashboard
- Usage: https://openrouter.ai/activity
- See requests, tokens, costs

## 💰 Cost Tracking

**Free Tier Limits:**
- Cloudflare: 100,000 requests/day
- Firebase: 50,000 reads, 20,000 writes/day
- OpenRouter Solar Pro 3: Free with rate limits

**Set up alerts:**
1. Cloudflare: Workers > Settings > Alerts
2. Firebase: Usage and billing > Set budget alerts
3. OpenRouter: Check usage regularly

## 🎉 You're Live!

Once deployed:
1. Share your app URL
2. Monitor usage and errors
3. Collect user feedback
4. Plan new features

Need help? Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
