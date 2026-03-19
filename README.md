# Sylo AI 🚀

**Your Intelligent AI Chat Companion**

Sylo AI is a modern, intelligent chat application powered by advanced AI models. It brings conversational AI to your fingertips with a beautiful, intuitive interface.

---

## 🤖 What Sylo AI Does

Sylo AI leverages cutting-edge AI technology to provide intelligent, context-aware conversations. Whether you need:

- **Quick Answers**: Ask questions and get instant, accurate responses
- **Creative Writing**: Get help with brainstorming, storytelling, and content creation
- **Code Assistance**: Get help with programming, debugging, and tech questions
- **Learning & Research**: Explore topics, understand concepts, and dive deep into subjects
- **Problem Solving**: Work through challenges with an AI that understands context
- **Productive Chat**: Keep your conversations organized with persistent history

The AI understands context from your entire conversation history, making interactions feel natural and coherent.

---

## ✨ Key Features

- 🎯 **Smart AI Conversations**: Real-time responses from advanced language models
- 📱 **Beautiful Interface**: Modern, responsive design that works on any device
- 👤 **Personalized Experience**: Sign up to save your chat history and sessions
- 💾 **Conversation History**: Access all your past conversations anytime
- 🔄 **Multiple Sessions**: Organize chats into different sessions for different topics
- 🚀 **Lightning Fast**: Optimized for speed with edge computing
- 🔒 **Secure & Private**: Your conversations are encrypted and protected
- ⚡ **Guest Mode**: Try it out without creating an account

---

## 🎨 User Experience

### Elegant Design
- Purple and blue gradient theme with smooth animations
- Intuitive navigation between features
- Responsive layout for desktop, tablet, and mobile
- Smooth transitions and modern UI components

### Easy Navigation
- **Home**: Explore what Sylo AI can do
- **Chat**: Start conversations with the AI
- **Features**: Learn about all capabilities
- **Get App**: Information about accessing Sylo
- **User Account**: Manage your profile and settings

---

## 🛠️ Technology Stack

**Frontend Technologies:**
- React 18 - Modern UI framework
- React Router - Smooth navigation
- Framer Motion - Beautiful animations
- CSS3 - Modern styling with gradients and effects
- Responsive Design - Mobile-first approach

**Backend & Infrastructure:**
- Cloudflare Workers - Serverless edge computing
- Firebase - Backend services
- OpenRouter API - AI model access

---

## 🌟 Getting Started

### Visit the Website
Simply open Sylo AI in your browser to:
1. Explore the features and capabilities
2. Try chatting without an account (guest mode)
3. Sign up for a free account to save your conversations
4. Start having intelligent conversations with the AI

### Create an Account
Sign up with your email to:
- Save all your conversations
- Create and organize multiple chat sessions
- Access your history anytime, anywhere
- Personalize your experience

---

## 📱 Supported Platforms

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablet (iPad, Android tablets)
- ✅ Mobile (iOS Safari, Android Chrome)
- ✅ Any modern web browser

---

## 🔐 Privacy & Security

Your data is protected with:
- Secure authentication
- Encrypted data transmission
- Private conversation storage
- No data sharing with third parties
- Compliance with privacy standards

---

## 💡 Use Cases

**For Students:**
- Get help with homework and research
- Understand complex topics
- Practice explaining concepts

**For Professionals:**
- Brainstorm ideas and solutions
- Draft emails and documents
- Research and analysis

**For Creators:**
- Generate creative ideas
- Get writing assistance
- Overcome writer's block

**For Everyone:**
- Quick answers to questions
- Learning new skills
- Having productive conversations

---

## 📧 Feedback & Support

We'd love to hear from you! Have suggestions or encounter issues? Let us know how we can improve Sylo AI.

---

**Enjoy intelligent conversations with Sylo AI!** 🎉
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
