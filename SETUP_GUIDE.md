# Sylo AI - Complete Setup Guide

This guide will walk you through setting up the complete Sylo AI application with Cloudflare Workers backend and Firebase database.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Cloudflare account (free tier works)
- Firebase account (free tier works)
- OpenAI API key (or other AI API)

## Part 1: Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "sylo-ai")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication

1. In Firebase Console, go to **Build > Authentication**
2. Click "Get started"
3. Click on "Email/Password" provider
4. Enable it and click "Save"

### 3. Enable Firestore Database

1. Go to **Build > Firestore Database**
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location close to your users
5. Click "Enable"

### 4. Set Firestore Rules

Go to the "Rules" tab and update with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Users can read/write their own history
      match /history/{sessionId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

### 5. Get Firebase Credentials

1. Go to **Project Settings** (gear icon)
2. Under "General" tab, find:
   - **Web API Key** (copy this)
   - **Project ID** (copy this)

## Part 2: Get AI API Key

### OpenRouter (Already Configured!)

Your OpenRouter API key is already set up:
```
```

**Model**: Upstage Solar Pro 3 (Free tier)

**Features**:
- Free to use with rate limits
- High-quality responses
- No credit card required
- Access to multiple AI models

**To manage your key**:
1. Go to [OpenRouter](https://openrouter.ai/)
2. Sign up or log in
3. View usage at https://openrouter.ai/activity

**Alternative Models** (if you want to change):
- `meta-llama/llama-3.2-3b-instruct:free` - Llama 3.2 (Free)
- `google/gemma-2-9b-it:free` - Gemma 2 (Free)
- `anthropic/claude-3.5-sonnet` - Claude (Paid)
- `openai/gpt-4-turbo` - GPT-4 (Paid)

See all models: https://openrouter.ai/models

## Part 3: Backend Setup (Cloudflare Workers)

### 1. Install Wrangler CLI

```bash
npm install -g wrangler
```

### 2. Login to Cloudflare

```bash
wrangler login
```

This will open a browser window to authenticate.

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Secrets

Set your API keys as Cloudflare Worker secrets:

```bash
# Set OpenRouter API Key
wrangler secret put OPENROUTER_API_KEY

# Set Firebase API Key
wrangler secret put FIREBASE_API_KEY
# Paste your Firebase Web API Key when prompted

# Set Firebase Project ID
wrangler secret put FIREBASE_PROJECT_ID
# Paste your Firebase Project ID when prompted
```

### 5. Test Locally (Optional)

```bash
npm run dev
```

This starts a local development server at `http://localhost:8787`

### 6. Deploy to Cloudflare

```bash
npm run deploy
```

After deployment, you'll see output like:
```
Published sylo-ai-backend (X.XX sec)
  https://sylo-ai-backend.YOUR-SUBDOMAIN.workers.dev
```

**Copy this URL** - you'll need it for the frontend!

## Part 4: Frontend Setup

### 1. Install Frontend Dependencies

```bash
cd ..  # Go back to root directory
npm install
```

### 2. Create Environment File

Create a `.env` file in the root directory:

```bash
# Copy the example
cp .env.example .env
```

Edit `.env` and add your Cloudflare Worker URL:

```
REACT_APP_API_URL=https://sylo-ai-backend.YOUR-SUBDOMAIN.workers.dev
```

Replace `YOUR-SUBDOMAIN` with your actual Cloudflare Workers subdomain.

### 3. Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

## Part 5: Testing

### Test Authentication

1. Click "Get Started" or "Sign Up" button
2. Fill in the signup form:
   - Full Name: Test User
   - Email: test@example.com
   - Password: test123456
3. Click "Create Account"
4. You should be logged in automatically

### Test Chat

1. Go to the Chat page
2. Type a message and press Enter
3. You should receive an AI response
4. The chat should appear in the History sidebar (if logged in)

### Test History

1. Start a new chat by clicking "New Chat"
2. Send a few messages
3. Click "New Chat" again
4. Your previous chat should appear in the History sidebar
5. Click on it to reload that conversation

## Part 6: Production Deployment

### Deploy Frontend

#### Option A: Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

#### Option B: Netlify

```bash
npm run build
# Upload the 'build' folder to Netlify
```

#### Option C: Cloudflare Pages

```bash
npm run build
wrangler pages publish build
```

### Update CORS (if needed)

If your frontend is on a different domain, update the CORS headers in `backend/src/index.js`:

```javascript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://your-frontend-domain.com',
  // ... rest of headers
};
```

Then redeploy the backend:

```bash
cd backend
npm run deploy
```

## Troubleshooting

### "Failed to send message" Error

- Check that your OpenRouter API key is valid
- Verify the API key is set correctly: `wrangler secret list`
- Check Cloudflare Worker logs: `wrangler tail`
- Check OpenRouter usage: https://openrouter.ai/activity

### "Signup failed" Error

- Verify Firebase API key and Project ID are correct
- Check that Email/Password authentication is enabled in Firebase
- Look at browser console for detailed error messages

### History Not Saving

- Make sure you're logged in
- Check Firestore rules allow authenticated access
- Verify Firebase Project ID is correct

### CORS Errors

- Check that CORS headers in backend include your frontend domain
- Make sure you're using the correct API URL in `.env`

## Features Overview

✅ **Guest Chat**: Users can chat without logging in
✅ **User Authentication**: Signup/Login with email and password
✅ **Chat History**: Logged-in users get persistent chat history
✅ **Session Management**: Up to 10 chat sessions saved per user
✅ **Real-time AI Responses**: Powered by OpenAI (or your chosen AI)
✅ **Responsive Design**: Works on desktop and mobile
✅ **Secure**: Token-based authentication with Firebase

## Cost Estimates

- **Cloudflare Workers**: Free tier includes 100,000 requests/day
- **Firebase**: Free tier includes 50,000 reads and 20,000 writes per day
- **OpenAI**: Pay per token (approximately $0.002 per 1K tokens for GPT-3.5)

For a small to medium app, you can run this completely free!

## Next Steps

- Customize the AI model in `backend/src/index.js`
- Add more features like file uploads, voice chat, etc.
- Implement password reset functionality
- Add user profile management
- Set up monitoring and analytics

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check Cloudflare Worker logs: `wrangler tail`
3. Verify all environment variables are set correctly
4. Review Firebase Authentication and Firestore rules

Happy coding! 🚀
