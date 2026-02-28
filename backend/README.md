# Sylo AI Backend - Cloudflare Worker

This is the backend API for Sylo AI, built with Cloudflare Workers.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable **Authentication** with Email/Password provider
4. Enable **Firestore Database**
5. Get your Firebase credentials:
   - API Key: Project Settings > General > Web API Key
   - Project ID: Project Settings > General > Project ID

### 3. OpenRouter API Key

This project uses OpenRouter with the **Upstage Solar Pro 3** model (free tier).

Your API key is already configured:
```
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
```

To get your own key or manage usage:
1. Go to [OpenRouter](https://openrouter.ai/)
2. Sign up or log in
3. Get your API key from the Keys section

**Model Used**: `upstage/solar-pro` (Solar Pro 3 - Free)

### 4. Configure Cloudflare Worker Secrets

```bash
# Set OpenRouter API Key
wrangler secret put OPENROUTER_API_KEY
# When prompted, paste: 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

# Set Firebase API Key
wrangler secret put FIREBASE_API_KEY

# Set Firebase Project ID
wrangler secret put FIREBASE_PROJECT_ID
```

### 5. Deploy to Cloudflare Workers

```bash
# Test locally
npm run dev

# Deploy to production
npm run deploy
```

After deployment, you'll get a URL like: `https://sylo-ai-backend.YOUR-SUBDOMAIN.workers.dev`

### 6. Update Frontend Configuration

Copy the deployed URL and add it to your frontend `.env` file:

```
REACT_APP_API_URL=https://sylo-ai-backend.YOUR-SUBDOMAIN.workers.dev
```

## API Endpoints

### Chat
- **POST** `/api/chat`
- Body: `{ message, model, conversationHistory }`
- Returns AI response

### Authentication
- **POST** `/api/auth/signup` - Create new account
- **POST** `/api/auth/login` - Login

### History
- **GET** `/api/history` - Get user's chat history (requires auth)
- **POST** `/api/history` - Save chat session (requires auth)
- **GET** `/api/history/session?sessionId=xxx` - Get specific session (requires auth)

## Features

- ✅ AI chat with OpenRouter (Solar Pro 3 model - Free)
- ✅ Firebase Authentication (email/password)
- ✅ Firestore database for user data and chat history
- ✅ Session management (max 10 sessions per user)
- ✅ CORS enabled for frontend access
- ✅ Token-based authentication
- ✅ Guest chat (no login required)
- ✅ Automatic history saving for logged-in users

## Firestore Structure

```
users/
  {userId}/
    - email
    - name
    - createdAt
    
    history/
      {sessionId}/
        - title
        - messages (JSON array)
        - updatedAt
```

## Customization

### Using Different AI Models

OpenRouter supports many models. To change the model, update the `handleChat` function in `src/index.js`:

```javascript
// Current: Solar Pro 3 (free)
model: 'upstage/solar-pro'

// Other free options:
model: 'meta-llama/llama-3.2-3b-instruct:free'
model: 'google/gemma-2-9b-it:free'
model: 'microsoft/phi-3-mini-128k-instruct:free'

// Paid options:
model: 'anthropic/claude-3.5-sonnet'
model: 'openai/gpt-4-turbo'
model: 'google/gemini-pro-1.5'
```

See all available models at: https://openrouter.ai/models

## Troubleshooting

### CORS Issues
- Make sure your frontend URL is allowed in CORS headers
- Check browser console for specific CORS errors

### Authentication Errors
- Verify Firebase API key and Project ID are correct
- Check Firebase Authentication is enabled
- Ensure Firestore rules allow authenticated access

### AI API Errors
- Verify OpenRouter API key is valid
- Check rate limits (free tier has limits)
- Review error messages in Cloudflare Worker logs
- Check OpenRouter dashboard for usage: https://openrouter.ai/activity

## Development

```bash
# Run locally with hot reload
npm run dev

# View logs
wrangler tail

# Check deployment status
wrangler deployments list
```
