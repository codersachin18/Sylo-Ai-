# Sylo AI - System Architecture

## Overview

Sylo AI is a full-stack AI chat application with the following architecture:

```
┌─────────────────┐
│   React App     │  (Frontend - Port 3000)
│   - Chat UI     │
│   - Auth Modal  │
│   - History     │
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────┐
│ Cloudflare      │  (Backend - Edge Network)
│ Workers API     │
│   - /api/chat   │
│   - /api/auth/* │
│   - /api/history│
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌─────────┐ ┌──────────┐
│ OpenAI  │ │ Firebase │
│   API   │ │  - Auth  │
└─────────┘ │  - Store │
            └──────────┘
```

## Frontend Architecture

### Technology Stack
- **React 18**: UI framework
- **React Router**: Client-side routing
- **Framer Motion**: Animations
- **Context API**: State management

### Key Components

#### 1. AuthContext (`src/context/AuthContext.js`)
- Manages user authentication state
- Provides login, signup, logout functions
- Persists user session in localStorage

#### 2. ChatPage (`src/pages/ChatPage.js`)
- Main chat interface
- Handles message sending/receiving
- Manages chat history
- Auto-saves sessions for logged-in users

#### 3. AuthModal (`src/components/AuthModal.js`)
- Signup/Login forms
- Form validation
- Error handling

#### 4. API Service (`src/services/api.js`)
- Centralized API communication
- Token management
- Request/response handling

### State Management

```javascript
// User State (AuthContext)
{
  user: {
    uid: string,
    email: string,
    name: string,
    token: string
  },
  isAuthenticated: boolean
}

// Chat State (ChatPage)
{
  chatHistory: [
    { type: 'user' | 'ai', text: string }
  ],
  conversations: [
    { id: string, title: string, date: string, messages: [] }
  ],
  currentSessionId: string | null
}
```

### Data Flow

1. **User sends message**
   ```
   User Input → ChatPage → API Service → Backend → AI API
   AI Response → Backend → API Service → ChatPage → UI Update
   ```

2. **User logs in**
   ```
   Form Submit → AuthModal → AuthContext → API Service → Backend → Firebase Auth
   Token → localStorage → AuthContext → App State Update
   ```

3. **History management**
   ```
   Chat Update → Auto-save trigger → API Service → Backend → Firestore
   Page Load → Fetch history → API Service → Backend → Firestore → UI Update
   ```

## Backend Architecture

### Technology Stack
- **Cloudflare Workers**: Serverless edge computing
- **Firebase Auth**: User authentication
- **Firestore**: NoSQL database
- **OpenRouter API**: AI responses (Solar Pro 3 model)

### API Endpoints

#### POST /api/chat
Sends user message to AI and returns response.

**Request:**
```json
{
  "message": "Hello, how are you?",
  "model": "Sylo Gen-6.7",
  "conversationHistory": [
    { "type": "user", "text": "Previous message" },
    { "type": "ai", "text": "Previous response" }
  ]
}
```

**Response:**
```json
{
  "response": "I'm doing well, thank you!",
  "model": "Sylo Gen-6.7"
}
```

#### POST /api/auth/signup
Creates new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "uid": "abc123",
    "email": "user@example.com",
    "name": "John Doe",
    "token": "eyJhbGc..."
  }
}
```

#### POST /api/auth/login
Authenticates existing user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "uid": "abc123",
    "email": "user@example.com",
    "name": "John Doe",
    "token": "eyJhbGc..."
  }
}
```

#### GET /api/history
Retrieves user's chat history (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "history": [
    {
      "sessionId": "1234567890",
      "title": "Chat about AI",
      "updatedAt": "2024-01-15T10:30:00Z",
      "messages": [...]
    }
  ]
}
```

#### POST /api/history
Saves chat session (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "sessionId": "1234567890",
  "title": "Chat about AI",
  "messages": [
    { "type": "user", "text": "Hello" },
    { "type": "ai", "text": "Hi there!" }
  ]
}
```

#### GET /api/history/session?sessionId=xxx
Retrieves specific chat session (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "session": {
    "sessionId": "1234567890",
    "title": "Chat about AI",
    "messages": [...],
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

## Database Schema

### Firestore Structure

```
users/
  {userId}/
    fields:
      - email: string
      - name: string
      - createdAt: timestamp
    
    history/
      {sessionId}/
        fields:
          - title: string
          - messages: string (JSON array)
          - updatedAt: timestamp
```

### Data Access Patterns

1. **Create User**: Write to `/users/{userId}`
2. **Save Session**: Write to `/users/{userId}/history/{sessionId}`
3. **Get History**: Query `/users/{userId}/history` (ordered by updatedAt, limit 10)
4. **Get Session**: Read `/users/{userId}/history/{sessionId}`

## Security

### Authentication Flow

1. User signs up/logs in
2. Firebase Auth creates user and returns JWT token
3. Token stored in localStorage
4. Token sent with every authenticated request
5. Backend verifies token with Firebase
6. Access granted if valid

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // Users can only access their own data
      allow read, write: if request.auth != null 
                         && request.auth.uid == userId;
      
      match /history/{sessionId} {
        // Users can only access their own history
        allow read, write: if request.auth != null 
                           && request.auth.uid == userId;
      }
    }
  }
}
```

### CORS Configuration

```javascript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
```

## Performance Optimizations

### Frontend
- **Code Splitting**: React Router lazy loading
- **Memoization**: React.memo for expensive components
- **Debouncing**: Input debouncing for search/filter
- **Local Storage**: Cache user data and token

### Backend
- **Edge Computing**: Cloudflare Workers run at edge locations
- **Minimal Dependencies**: No heavy frameworks
- **Efficient Queries**: Firestore queries limited to 10 results
- **Token Caching**: Verify tokens only when needed

## Scalability

### Current Limits
- **Cloudflare Workers**: 100,000 requests/day (free tier)
- **Firestore**: 50,000 reads, 20,000 writes/day (free tier)
- **OpenAI**: Rate limited by API key tier

### Scaling Strategy

1. **Horizontal Scaling**: Cloudflare Workers auto-scale globally
2. **Database Sharding**: Firestore auto-shards collections
3. **Caching**: Add Redis/KV for frequently accessed data
4. **Rate Limiting**: Implement per-user rate limits
5. **CDN**: Static assets served via Cloudflare CDN

## Monitoring & Logging

### Frontend
- Browser console errors
- User analytics (optional)
- Performance metrics

### Backend
- Cloudflare Workers logs: `wrangler tail`
- Error tracking
- API response times
- Usage metrics

## Future Enhancements

### Planned Features
- [ ] File upload support
- [ ] Voice chat
- [ ] Multi-language support
- [ ] Chat export (PDF, TXT)
- [ ] User profile management
- [ ] Password reset
- [ ] Social login (Google, GitHub)
- [ ] Real-time collaboration
- [ ] Custom AI model selection
- [ ] Chat sharing

### Technical Improvements
- [ ] WebSocket for real-time updates
- [ ] Service Worker for offline support
- [ ] Progressive Web App (PWA)
- [ ] End-to-end encryption
- [ ] Advanced caching strategies
- [ ] A/B testing framework
- [ ] Automated testing suite

## Development Workflow

### Local Development
```bash
# Frontend
npm start

# Backend
cd backend
npm run dev
```

### Testing
```bash
# Frontend tests
npm test

# Backend tests
cd backend
npm test
```

### Deployment
```bash
# Backend
cd backend
npm run deploy

# Frontend
npm run build
# Deploy to Vercel/Netlify/Cloudflare Pages
```

## Cost Analysis

### Monthly Costs (Estimated)

**Free Tier:**
- Cloudflare Workers: $0 (up to 100k requests/day)
- Firebase: $0 (up to 50k reads, 20k writes/day)
- OpenAI: ~$5-20 (depends on usage)

**Paid Tier (1000 users):**
- Cloudflare Workers: $5/month
- Firebase: $25/month
- OpenAI: $50-200/month
- **Total**: ~$80-230/month

## Conclusion

This architecture provides:
- ✅ Scalable serverless backend
- ✅ Secure authentication
- ✅ Real-time AI responses
- ✅ Persistent chat history
- ✅ Global edge distribution
- ✅ Cost-effective operation
- ✅ Easy maintenance

The system is production-ready and can handle thousands of concurrent users with minimal configuration.
