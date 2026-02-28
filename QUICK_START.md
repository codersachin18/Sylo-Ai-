# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Get Your API Keys

You need 3 things:

1. **OpenRouter API Key**: Already provided!
   ```
   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
   ```
   Using **Upstage Solar Pro 3** model (free tier)
   
2. **Firebase API Key**: 
   - Create project at https://console.firebase.google.com/
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Get API Key from Project Settings
   
3. **Firebase Project ID**: Found in Project Settings

### Step 3: Configure Backend

```bash
cd backend

# Login to Cloudflare
wrangler login

# Set your secrets
wrangler secret put OPENROUTER_API_KEY
# Paste: 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

wrangler secret put FIREBASE_API_KEY
wrangler secret put FIREBASE_PROJECT_ID

# Deploy
npm run deploy
```

Copy the deployed URL (e.g., `https://sylo-ai-backend.xxx.workers.dev`)

### Step 4: Configure Frontend

Edit `.env` file in root directory:

```
REACT_APP_API_URL=https://sylo-ai-backend.xxx.workers.dev
```

### Step 5: Run the App

```bash
npm start
```

Visit `http://localhost:3000` and start chatting!

## 🎯 What Works Now

- ✅ Chat with AI (works for everyone, no login required)
- ✅ User signup and login
- ✅ Chat history saved for logged-in users
- ✅ Click history items to reload conversations
- ✅ Auto-save sessions (max 10 per user)
- ✅ New chat button to start fresh conversations

## 📝 Firebase Setup Details

### Firestore Rules

In Firebase Console > Firestore Database > Rules:

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

## 🔧 Local Development

To test backend locally before deploying:

```bash
cd backend
npm run dev
```

Then update `.env` to use `http://localhost:8787`

## 💡 Tips

- Guest users can chat but history won't be saved
- Logged-in users get persistent history across devices
- History is limited to 10 most recent sessions
- Each session auto-saves as you chat

## 🐛 Common Issues

**"Failed to send message"**
- Check OpenRouter API key is set correctly
- Verify backend is deployed correctly
- Check OpenRouter dashboard: https://openrouter.ai/activity

**"Signup failed"**
- Enable Email/Password auth in Firebase
- Check Firebase API key is correct

**History not loading**
- Make sure you're logged in
- Check Firestore rules are set correctly

For detailed setup, see `SETUP_GUIDE.md`
