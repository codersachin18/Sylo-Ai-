# Sylo AI - Intelligent Chat Application

A modern, full-stack AI chat application with user authentication, persistent chat history, and real-time AI responses.

![Sylo AI](public/bubble-effect.gif)

## ✨ Features

- 🤖 **AI-Powered Chat**: Real-time conversations with advanced AI models
- 👤 **User Authentication**: Secure signup/login with Firebase
- 💾 **Chat History**: Persistent conversation history for logged-in users
- 🔄 **Session Management**: Save and reload up to 10 chat sessions
- 🌐 **Guest Mode**: Chat without logging in (history not saved)
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- ⚡ **Edge Computing**: Lightning-fast responses via Cloudflare Workers
- 🔒 **Secure**: Token-based authentication and encrypted data
- 🎨 **Modern UI**: Beautiful purple/blue gradient theme with animations

## 🏗️ Architecture

- **Frontend**: React 18 + React Router + Framer Motion
- **Backend**: Cloudflare Workers (Serverless)
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **AI**: OpenRouter API with Solar Pro 3 (Free)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- Cloudflare account
- Firebase account
- OpenRouter API key (already provided)

### Installation

```bash
# Install dependencies
npm install
cd backend && npm install && cd ..

# Set up environment
cp .env.example .env
```

### Configuration

1. **Set up Firebase** (see [SETUP_GUIDE.md](SETUP_GUIDE.md))
2. **OpenRouter API key is already configured** (Solar Pro 3 - Free)
3. **Deploy backend**:
   ```bash
   cd backend
   wrangler login
   wrangler secret put OPENROUTER_API_KEY
   # Paste: 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
   wrangler secret put FIREBASE_API_KEY
   wrangler secret put FIREBASE_PROJECT_ID
   npm run deploy
   ```
4. **Update `.env`** with your backend URL
5. **Start frontend**:
   ```bash
   npm start
   ```

## 📚 Documentation

- [Quick Start Guide](QUICK_START.md) - Get up and running in 5 minutes
- [Setup Guide](SETUP_GUIDE.md) - Detailed setup instructions
- [Architecture](ARCHITECTURE.md) - System design and technical details
- [Deployment Checklist](DEPLOYMENT_CHECKLIST.md) - Pre-launch checklist
- [Backend README](backend/README.md) - Backend-specific documentation

## 🎯 Usage

### For Guests
1. Visit the chat page
2. Start typing and chatting
3. History won't be saved

### For Registered Users
1. Click "Sign Up" and create an account
2. Start chatting - history auto-saves
3. Click "New Chat" to start fresh conversations
4. Click history items to reload previous chats
5. Up to 10 sessions saved automatically

## 🛠️ Development

```bash
# Run frontend
npm start

# Run backend locally
cd backend
npm run dev

# Build for production
npm run build

# Deploy backend
cd backend
npm run deploy
```

## 📦 Project Structure

```
sylo-ai-website/
├── src/
│   ├── components/       # React components
│   │   ├── Navbar.js    # Navigation with auth
│   │   ├── AuthModal.js # Signup/Login modal
│   │   ├── Hero.js      # Landing page hero
│   │   ├── Features.js  # Feature showcase
│   │   └── ...
│   ├── pages/
│   │   ├── Home.js      # Landing page
│   │   ├── ChatPage.js  # Main chat interface
│   │   └── ...
│   ├── services/
│   │   └── api.js       # API service layer
│   ├── context/
│   │   └── AuthContext.js # Auth state management
│   └── ...
├── backend/
│   └── src/
│       └── index.js     # Cloudflare Worker API
├── public/              # Static assets
└── docs/               # Documentation
```

## 🔐 Security

- Firebase Authentication for user management
- Token-based API authentication
- Firestore security rules
- HTTPS enforced
- API keys stored as secrets
- CORS configured properly

## 💰 Cost Estimate

**Free Tier** (suitable for development and small projects):
- Cloudflare Workers: Free (100k requests/day)
- Firebase: Free (50k reads, 20k writes/day)
- OpenRouter Solar Pro 3: Free (with rate limits)

**Production** (1000+ users):
- ~$30-80/month depending on usage (if you upgrade AI model)

## 🎨 UI Components

- **Orb**: Animated canvas-based logo with gradient effects
- **Navbar**: Sticky navigation with auth buttons
- **Hero**: Landing section with animated elements
- **ChatPage**: Full-featured chat interface with history sidebar
- **AuthModal**: Beautiful signup/login forms
- **Features**: Animated feature showcase
- **AppShowcase**: Mobile app preview

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for setup issues
- Review [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) before deploying
- See [ARCHITECTURE.md](ARCHITECTURE.md) for technical details

## 🎉 Acknowledgments

- OpenAI for the AI API
- OpenRouter for AI model access
- Cloudflare for Workers platform
- Firebase for authentication and database
- React team for the amazing framework

---

Built with ❤️ using React, Cloudflare Workers, and Firebase
