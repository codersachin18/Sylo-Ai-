# System Flow Diagrams

Visual representation of how the Sylo AI system works.

## 🔄 Complete System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER DEVICE                          │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              React Frontend (Port 3000)             │    │
│  │                                                      │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐     │    │
│  │  │  Navbar  │  │   Hero   │  │  ChatPage    │     │    │
│  │  └──────────┘  └──────────┘  └──────────────┘     │    │
│  │                                      │               │    │
│  │  ┌──────────────────────────────────┘               │    │
│  │  │                                                   │    │
│  │  ▼                                                   │    │
│  │  ┌──────────────────────────────────────────┐      │    │
│  │  │         AuthContext (State)              │      │    │
│  │  │  - user: { uid, email, name, token }     │      │    │
│  │  │  - isAuthenticated: boolean              │      │    │
│  │  └──────────────────────────────────────────┘      │    │
│  │                      │                              │    │
│  │                      ▼                              │    │
│  │  ┌──────────────────────────────────────────┐      │    │
│  │  │         API Service (api.js)             │      │    │
│  │  │  - sendMessage()                         │      │    │
│  │  │  - signup()                              │      │    │
│  │  │  - login()                               │      │    │
│  │  │  - getHistory()                          │      │    │
│  │  │  - saveHistory()                         │      │    │
│  │  └──────────────────────────────────────────┘      │    │
│  └────────────────────────┬─────────────────────────────┘    │
└────────────────────────────┼──────────────────────────────────┘
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────┐
│              Cloudflare Workers (Edge Network)               │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           Worker API (backend/src/index.js)        │    │
│  │                                                      │    │
│  │  Routes:                                            │    │
│  │  • POST   /api/chat                                 │    │
│  │  • POST   /api/auth/signup                          │    │
│  │  • POST   /api/auth/login                           │    │
│  │  • GET    /api/history                              │    │
│  │  • POST   /api/history                              │    │
│  │  • GET    /api/history/session                      │    │
│  │                                                      │    │
│  │  Secrets:                                           │    │
│  │  • OPENAI_API_KEY                                   │    │
│  │  • FIREBASE_API_KEY                                 │    │
│  │  • FIREBASE_PROJECT_ID                              │    │
│  └────────────────────────────────────────────────────┘    │
└────────────────┬────────────────────┬────────────────────────┘
                 │                    │
        ┌────────┘                    └────────┐
        │                                      │
        ▼                                      ▼
┌──────────────────┐              ┌──────────────────────────┐
│  OpenRouter API  │              │   Firebase Services      │
│                  │              │                          │
│  • Solar Pro 3   │              │  ┌────────────────────┐ │
│  • Free Tier     │              │  │  Authentication    │ │
│  • Chat API      │              │  │  - Email/Password  │ │
│                  │              │  │  - JWT Tokens      │ │
│                  │              │  └────────────────────┘ │
│                  │              │                          │
│                  │              │  ┌────────────────────┐ │
│                  │              │  │  Firestore DB      │ │
│                  │              │  │  - users/          │ │
│                  │              │  │    - history/      │ │
│                  │              │  └────────────────────┘ │
└──────────────────┘              └──────────────────────────┘
```

## 💬 Chat Message Flow

```
1. User Types Message
   │
   ▼
2. ChatPage Component
   │ - Add to chatHistory state
   │ - Set loading state
   ▼
3. API Service
   │ - Get token from localStorage
   │ - Prepare request
   ▼
4. Cloudflare Worker
   │ - Receive request
   │ - Extract message & history
   ▼
5. OpenRouter API
   │ - Send conversation context
   │ - Get AI response (Solar Pro 3)
   ▼
6. Cloudflare Worker
   │ - Format response
   │ - Return to frontend
   ▼
7. API Service
   │ - Parse response
   │ - Return to component
   ▼
8. ChatPage Component
   │ - Add AI response to chatHistory
   │ - Clear loading state
   │ - Trigger auto-save
   ▼
9. Auto-Save (if logged in)
   │ - Generate session ID
   │ - Create title from first message
   │ - Send to backend
   ▼
10. Cloudflare Worker
    │ - Verify token
    │ - Save to Firestore
    ▼
11. Firestore
    │ - Store in users/{uid}/history/{sessionId}
    │ - Keep only 10 most recent
    ▼
12. UI Update
    - Message displayed
    - History sidebar updated
```

## 🔐 Authentication Flow

### Signup Flow

```
1. User Fills Signup Form
   │ - Name
   │ - Email
   │ - Password
   ▼
2. AuthModal Component
   │ - Validate inputs
   │ - Call signup()
   ▼
3. AuthContext
   │ - Call API service
   ▼
4. API Service
   │ - POST to /api/auth/signup
   ▼
5. Cloudflare Worker
   │ - Validate data
   │ - Call Firebase Auth API
   ▼
6. Firebase Authentication
   │ - Create user account
   │ - Generate JWT token
   │ - Return user data
   ▼
7. Cloudflare Worker
   │ - Save user to Firestore
   │ - Return user + token
   ▼
8. API Service
   │ - Store token in localStorage
   │ - Return user data
   ▼
9. AuthContext
   │ - Update user state
   │ - Save user to localStorage
   ▼
10. UI Update
    │ - Close modal
    │ - Show user info in sidebar
    │ - Enable history features
```

### Login Flow

```
1. User Fills Login Form
   │ - Email
   │ - Password
   ▼
2. AuthModal Component
   │ - Validate inputs
   │ - Call login()
   ▼
3. AuthContext
   │ - Call API service
   ▼
4. API Service
   │ - POST to /api/auth/login
   ▼
5. Cloudflare Worker
   │ - Validate credentials
   │ - Call Firebase Auth API
   ▼
6. Firebase Authentication
   │ - Verify credentials
   │ - Generate JWT token
   │ - Return user data
   ▼
7. Cloudflare Worker
   │ - Get user from Firestore
   │ - Return user + token
   ▼
8. API Service
   │ - Store token in localStorage
   │ - Return user data
   ▼
9. AuthContext
   │ - Update user state
   │ - Save user to localStorage
   ▼
10. UI Update
    │ - Close modal
    │ - Show user info
    │ - Load chat history
```

## 📚 History Management Flow

### Save History

```
1. Chat Message Sent/Received
   │
   ▼
2. useEffect Triggered
   │ - Detects chatHistory change
   │ - Checks if user logged in
   ▼
3. saveCurrentSession()
   │ - Generate/use session ID
   │ - Create title from first message
   │ - Prepare data
   ▼
4. API Service
   │ - POST to /api/history
   │ - Include auth token
   ▼
5. Cloudflare Worker
   │ - Verify token
   │ - Extract user ID
   ▼
6. Firestore
   │ - Save to users/{uid}/history/{sessionId}
   │ - Update timestamp
   ▼
7. Success Response
   │ - History saved
```

### Load History

```
1. Page Load / User Login
   │
   ▼
2. useEffect Triggered
   │ - Checks if user logged in
   ▼
3. loadHistory()
   │ - Call API service
   ▼
4. API Service
   │ - GET /api/history
   │ - Include auth token
   ▼
5. Cloudflare Worker
   │ - Verify token
   │ - Extract user ID
   ▼
6. Firestore
   │ - Query users/{uid}/history
   │ - Order by updatedAt DESC
   │ - Limit to 10
   ▼
7. Cloudflare Worker
   │ - Format response
   │ - Return history array
   ▼
8. API Service
   │ - Parse response
   │ - Return to component
   ▼
9. ChatPage Component
   │ - Update conversations state
   │ - Display in sidebar
```

### Load Specific Session

```
1. User Clicks History Item
   │
   ▼
2. handleLoadSession(sessionId)
   │ - Call API service
   ▼
3. API Service
   │ - GET /api/history/session?sessionId=xxx
   │ - Include auth token
   ▼
4. Cloudflare Worker
   │ - Verify token
   │ - Extract user ID
   ▼
5. Firestore
   │ - Get users/{uid}/history/{sessionId}
   ▼
6. Cloudflare Worker
   │ - Return session data
   ▼
7. API Service
   │ - Parse response
   │ - Return to component
   ▼
8. ChatPage Component
   │ - Update chatHistory state
   │ - Set currentSessionId
   │ - Display messages
```

## 🔄 New Chat Flow

```
1. User Clicks "New Chat"
   │
   ▼
2. handleNewChat()
   │ - Check if user logged in
   │ - Check if current chat has messages
   ▼
3. Save Current Session (if applicable)
   │ - Call saveCurrentSession()
   │ - Wait for completion
   ▼
4. Refresh History
   │ - Call loadHistory()
   │ - Update sidebar
   ▼
5. Clear Chat
   │ - Reset chatHistory to []
   │ - Reset message input
   │ - Reset currentSessionId
   ▼
6. UI Update
   │ - Show empty state
   │ - Show suggestions
   │ - Ready for new conversation
```

## 🎯 Data Storage Locations

```
┌─────────────────────────────────────────────────────────┐
│                    localStorage                          │
│                                                          │
│  • sylo_token: "JWT_TOKEN"                              │
│  • sylo_user: {                                         │
│      uid: "user123",                                    │
│      email: "user@example.com",                         │
│      name: "User Name"                                  │
│    }                                                     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  Firestore Database                      │
│                                                          │
│  users/                                                  │
│    user123/                                             │
│      • email: "user@example.com"                        │
│      • name: "User Name"                                │
│      • createdAt: "2024-01-15T10:00:00Z"               │
│                                                          │
│      history/                                           │
│        session1/                                        │
│          • title: "Chat about AI"                       │
│          • messages: "[{...}, {...}]"                   │
│          • updatedAt: "2024-01-15T10:30:00Z"           │
│        session2/                                        │
│          • title: "Help with code"                      │
│          • messages: "[{...}, {...}]"                   │
│          • updatedAt: "2024-01-15T11:00:00Z"           │
│        ...                                              │
│        (max 10 sessions)                                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              Cloudflare Worker Secrets                   │
│                                                          │
│  • OPENROUTER_API_KEY                                   │
│  • FIREBASE_API_KEY                                     │
│  • FIREBASE_PROJECT_ID                                  │
└─────────────────────────────────────────────────────────┘
```

## 🚦 Request/Response Examples

### Chat Request

```http
POST /api/chat
Content-Type: application/json

{
  "message": "What is React?",
  "model": "Sylo Gen-6.7",
  "conversationHistory": [
    { "type": "user", "text": "Hello" },
    { "type": "ai", "text": "Hi! How can I help?" }
  ]
}

Response:
{
  "response": "React is a JavaScript library...",
  "model": "Sylo Gen-6.7"
}
```

### Signup Request

```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response:
{
  "success": true,
  "user": {
    "uid": "abc123",
    "email": "user@example.com",
    "name": "John Doe",
    "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6..."
  }
}
```

### Get History Request

```http
GET /api/history
Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6...

Response:
{
  "history": [
    {
      "sessionId": "1705315200000",
      "title": "Chat about AI",
      "updatedAt": "2024-01-15T10:30:00Z",
      "messages": [...]
    },
    {
      "sessionId": "1705318800000",
      "title": "Help with code",
      "updatedAt": "2024-01-15T11:00:00Z",
      "messages": [...]
    }
  ]
}
```

This visual guide should help you understand how all the pieces fit together! 🎉
