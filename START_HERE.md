# 🚀 START HERE - Sylo AI Setup

Welcome! Your Sylo AI chat application is ready to deploy.

## ⚡ Quick Setup (10 Minutes)

### What You Have

✅ Complete React frontend with chat interface
✅ Cloudflare Workers backend (serverless)
✅ OpenRouter AI integration (FREE - Solar Pro 3 model)
✅ Firebase authentication & database
✅ All code written and tested
✅ Deployment scripts ready

### What You Need

1. **Firebase Account** (free) - https://console.firebase.google.com/
2. **Cloudflare Account** (free) - https://dash.cloudflare.com/
3. **OpenRouter API Key** - Already provided! ✅

```
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
```

## 📋 Setup Steps

### Step 1: Firebase Setup (5 min)

1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name it "sylo-ai" (or anything you like)
4. Click through the setup (disable Analytics if you want)

**Enable Authentication:**
1. Go to Build > Authentication
2. Click "Get started"
3. Enable "Email/Password"
4. Click "Save"

**Enable Firestore:**
1. Go to Build > Firestore Database
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location
5. Click "Enable"

**Set Firestore Rules:**
1. Go to "Rules" tab
2. Replace with:
```
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
3. Click "Publish"

**Get Your Credentials:**
1. Go to Project Settings (gear icon)
2. Copy **Web API Key**
3. Copy **Project ID**

### Step 2: Deploy Backend (3 min)

Open terminal in the `backend` folder:

**Windows:**
```bash
cd backend
deploy.bat
```

**Mac/Linux:**
```bash
cd backend
chmod +x deploy.sh
./deploy.sh
```

The script will:
- Install Wrangler CLI (if needed)
- Login to Cloudflare
- Set your OpenRouter API key (already provided)
- Ask for Firebase API Key (paste from Step 1)
- Ask for Firebase Project ID (paste from Step 1)
- Deploy to Cloudflare Workers
- Show you the Worker URL

**Copy the Worker URL!** It looks like:
```
https://sylo-ai-backend.YOUR-SUBDOMAIN.workers.dev
```

### Step 3: Configure Frontend (1 min)

1. Open `.env` file in the root folder
2. Update with your Worker URL:
```
REACT_APP_API_URL=https://sylo-ai-backend.YOUR-SUBDOMAIN.workers.dev
```
3. Save the file

### Step 4: Test Locally (1 min)

```bash
npm start
```

Visit http://localhost:3000

**Test these:**
1. ✅ Send a chat message (works without login)
2. ✅ Click "Sign Up" and create account
3. ✅ Send messages (history should save)
4. ✅ Refresh page (history should load)
5. ✅ Click history item (chat should reload)
6. ✅ Click "New Chat" (starts fresh)

## 🎉 You're Done!

Your app is now running locally with:
- ✅ Real AI responses (OpenRouter Solar Pro 3)
- ✅ User authentication (Firebase)
- ✅ Persistent chat history (Firestore)
- ✅ Session management
- ✅ Guest mode

## 📱 Deploy to Production (Optional)

### Option A: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option B: Netlify
```bash
npm run build
# Upload 'build' folder to Netlify
```

### Option C: Cloudflare Pages
```bash
npm run build
npx wrangler pages publish build
```

## 📚 Documentation

- **Quick Start**: `QUICK_START.md` - 5-minute guide
- **Full Setup**: `SETUP_GUIDE.md` - Detailed instructions
- **OpenRouter**: `OPENROUTER_SETUP.md` - AI model info
- **Deployment**: `DEPLOYMENT_STEPS.md` - Deploy guide
- **Troubleshooting**: `TROUBLESHOOTING.md` - Common issues
- **Architecture**: `ARCHITECTURE.md` - How it works

## 🐛 Something Not Working?

### Backend Issues
```bash
cd backend
wrangler tail  # View logs
wrangler secret list  # Check secrets
npm run deploy  # Redeploy
```

### Frontend Issues
- Check `.env` has correct Worker URL
- Restart dev server: `npm start`
- Clear browser cache: Ctrl+Shift+R

### Common Errors

**"Failed to send message"**
- Check backend is deployed
- Verify OpenRouter API key is set
- View logs: `wrangler tail`

**"Unauthorized"**
- Check Firebase API key is correct
- Log out and log back in

**"History not saving"**
- Make sure you're logged in
- Check Firestore rules are set

See `TROUBLESHOOTING.md` for more help.

## 💰 Costs

**FREE TIER** (what you're using):
- Cloudflare: 100,000 requests/day
- Firebase: 50,000 reads, 20,000 writes/day
- OpenRouter Solar Pro 3: Free with rate limits

**Perfect for:**
- Development
- Testing
- Small projects
- Personal use
- Up to ~100 daily users

## 🎯 What's Next?

### Immediate
1. ✅ Get it running locally
2. ✅ Test all features
3. ✅ Deploy to production

### Soon
- Customize the UI colors
- Add more AI models
- Implement password reset
- Add user profiles
- Export chat history

### Later
- File upload support
- Voice chat
- Multi-language
- Mobile app
- Custom branding

## 🆘 Need Help?

1. Check `TROUBLESHOOTING.md`
2. Review `SETUP_GUIDE.md`
3. Read `OPENROUTER_SETUP.md`
4. Check browser console (F12)
5. View backend logs: `wrangler tail`

## 🎊 Features

### For Everyone
- Chat with AI (no login required)
- Get instant responses
- Use suggestion chips
- Beautiful UI

### For Registered Users
- Persistent chat history
- Save up to 10 sessions
- Click history to reload
- Auto-save conversations
- Sync across devices

## 🔐 Security

- ✅ Firebase Authentication
- ✅ JWT tokens
- ✅ Firestore security rules
- ✅ API keys as secrets
- ✅ HTTPS enforced
- ✅ CORS configured

## 📊 Monitor Usage

- **OpenRouter**: https://openrouter.ai/activity
- **Cloudflare**: https://dash.cloudflare.com/
- **Firebase**: https://console.firebase.google.com/

## ✨ Key Files

```
sylo-ai-website/
├── START_HERE.md          ← You are here!
├── QUICK_START.md         ← 5-minute guide
├── FINAL_SUMMARY.md       ← Complete overview
├── backend/
│   ├── deploy.bat         ← Windows deployment
│   ├── deploy.sh          ← Mac/Linux deployment
│   └── src/index.js       ← Backend API
├── src/
│   ├── pages/ChatPage.js  ← Main chat
│   └── services/api.js    ← API calls
└── .env                   ← Configuration
```

## 🚀 Ready?

1. Setup Firebase (5 min)
2. Run `backend/deploy.bat` (3 min)
3. Update `.env` (1 min)
4. Run `npm start` (1 min)

**Total time: 10 minutes**

Let's go! 🎉
