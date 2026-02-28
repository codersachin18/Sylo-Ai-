// Cloudflare Worker for Sylo AI Backend

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // Route handling
      if (path === '/api/chat' && request.method === 'POST') {
        return handleChat(request, env);
      }
      
      if (path === '/api/auth/signup' && request.method === 'POST') {
        return handleSignup(request, env);
      }
      
      if (path === '/api/auth/login' && request.method === 'POST') {
        return handleLogin(request, env);
      }
      
      if (path === '/api/history' && request.method === 'GET') {
        return handleGetHistory(request, env);
      }
      
      if (path === '/api/history' && request.method === 'POST') {
        return handleSaveHistory(request, env);
      }
      
      if (path === '/api/history/session' && request.method === 'GET') {
        return handleGetSession(request, env);
      }

      return jsonResponse({ error: 'Not found' }, 404);
    } catch (error) {
      return jsonResponse({ error: error.message }, 500);
    }
  }
};

// Chat endpoint - sends message to AI and returns response
async function handleChat(request, env) {
  const { message, model = 'Sylo Gen-6.7', conversationHistory = [] } = await request.json();
  
  if (!message) {
    return jsonResponse({ error: 'Message is required' }, 400);
  }

  try {
    // Call Groq API
    const aiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [
          {
            role: 'system',
            content: `You are Sylo AI, an advanced and intelligent AI assistant created by Sylo.

IDENTITY:
- Your name is Sylo AI (never use quotes around your name)
- You were created and developed by Sylo
- Sylo is your creator and owner
- Always respond in English language only

RESPONSE STYLE - Be concise yet comprehensive:

1. USE MARKDOWN FOR CLARITY:
   - Use ## for main headings, ### for subheadings
   - Use **bold** for key terms and emphasis
   - Use bullet points (- or *) and numbered lists
   - Use > for important notes

2. CODE FORMATTING:
   - Always use \`\`\`language for code blocks with proper language tags
   - Use \`inline code\` for commands and technical terms
   - Include brief comments in code examples

3. TABLES FOR COMPARISONS:
   - Use markdown tables for comparisons and data
   - Format: | Header 1 | Header 2 |
            |----------|----------|
            | Data 1   | Data 2   |

4. BE CLEAR AND STRUCTURED:
   - Start with a direct answer
   - Break down complex topics with headings
   - Use numbered steps for processes
   - Include relevant examples
   - Be thorough but concise

Remember: Be helpful, well-organized, and clear like ChatGPT!`
          },
          ...conversationHistory.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.text
          })),
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 2500,
        top_p: 0.9
      })
    });

    const data = await aiResponse.json();
    
    if (!aiResponse.ok) {
      throw new Error(data.error?.message || 'AI API error');
    }

    return jsonResponse({
      response: data.choices[0].message.content,
      model: model
    });
  } catch (error) {
    return jsonResponse({ error: 'Failed to get AI response: ' + error.message }, 500);
  }
}

// Signup endpoint
async function handleSignup(request, env) {
  const { email, password, name } = await request.json();
  
  if (!email || !password || !name) {
    return jsonResponse({ error: 'Email, password, and name are required' }, 400);
  }

  try {
    // Create user in Firebase Auth
    const authResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${env.FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    const authData = await authResponse.json();
    
    if (!authResponse.ok) {
      throw new Error(authData.error?.message || 'Signup failed');
    }

    // Store user data in Firebase Firestore
    await saveUserToFirestore(env, authData.localId, { email, name, createdAt: new Date().toISOString() });

    return jsonResponse({
      success: true,
      user: {
        uid: authData.localId,
        email,
        name,
        token: authData.idToken
      }
    });
  } catch (error) {
    return jsonResponse({ error: error.message }, 400);
  }
}

// Login endpoint
async function handleLogin(request, env) {
  const { email, password } = await request.json();
  
  if (!email || !password) {
    return jsonResponse({ error: 'Email and password are required' }, 400);
  }

  try {
    const authResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${env.FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    const authData = await authResponse.json();
    
    if (!authResponse.ok) {
      throw new Error(authData.error?.message || 'Login failed');
    }

    // Get user data from Firestore
    const userData = await getUserFromFirestore(env, authData.localId);

    return jsonResponse({
      success: true,
      user: {
        uid: authData.localId,
        email: authData.email,
        name: userData?.name || '',
        token: authData.idToken
      }
    });
  } catch (error) {
    return jsonResponse({ error: error.message }, 400);
  }
}

// Get chat history for a user
async function handleGetHistory(request, env) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  try {
    const userId = await verifyToken(env, token);
    const history = await getHistoryFromFirestore(env, userId);
    
    return jsonResponse({ history: history || [] });
  } catch (error) {
    return jsonResponse({ error: error.message }, 401);
  }
}

// Save chat session to history
async function handleSaveHistory(request, env) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  try {
    const userId = await verifyToken(env, token);
    const { sessionId, title, messages } = await request.json();
    
    await saveHistoryToFirestore(env, userId, {
      sessionId,
      title,
      messages,
      updatedAt: new Date().toISOString()
    });
    
    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse({ error: error.message }, 400);
  }
}

// Get specific chat session
async function handleGetSession(request, env) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  const url = new URL(request.url);
  const sessionId = url.searchParams.get('sessionId');
  
  if (!token) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  try {
    const userId = await verifyToken(env, token);
    const session = await getSessionFromFirestore(env, userId, sessionId);
    
    return jsonResponse({ session });
  } catch (error) {
    return jsonResponse({ error: error.message }, 400);
  }
}

// Helper functions for Firebase Firestore
async function saveUserToFirestore(env, userId, userData) {
  const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/users/${userId}`;
  
  await fetch(firestoreUrl, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        email: { stringValue: userData.email },
        name: { stringValue: userData.name },
        createdAt: { stringValue: userData.createdAt }
      }
    })
  });
}

async function getUserFromFirestore(env, userId) {
  const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/users/${userId}`;
  
  const response = await fetch(firestoreUrl);
  if (!response.ok) return null;
  
  const data = await response.json();
  return {
    name: data.fields?.name?.stringValue || '',
    email: data.fields?.email?.stringValue || ''
  };
}

async function saveHistoryToFirestore(env, userId, sessionData) {
  const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/users/${userId}/history/${sessionData.sessionId}`;
  
  await fetch(firestoreUrl, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        title: { stringValue: sessionData.title },
        messages: { stringValue: JSON.stringify(sessionData.messages) },
        updatedAt: { stringValue: sessionData.updatedAt }
      }
    })
  });
}

async function getHistoryFromFirestore(env, userId) {
  const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/users/${userId}/history`;
  
  const response = await fetch(firestoreUrl);
  if (!response.ok) return [];
  
  const data = await response.json();
  if (!data.documents) return [];
  
  return data.documents
    .map(doc => ({
      sessionId: doc.name.split('/').pop(),
      title: doc.fields?.title?.stringValue || 'Untitled',
      updatedAt: doc.fields?.updatedAt?.stringValue || '',
      messages: JSON.parse(doc.fields?.messages?.stringValue || '[]')
    }))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 10); // Keep only 10 most recent
}

async function getSessionFromFirestore(env, userId, sessionId) {
  const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/users/${userId}/history/${sessionId}`;
  
  const response = await fetch(firestoreUrl);
  if (!response.ok) return null;
  
  const data = await response.json();
  return {
    sessionId,
    title: data.fields?.title?.stringValue || 'Untitled',
    messages: JSON.parse(data.fields?.messages?.stringValue || '[]'),
    updatedAt: data.fields?.updatedAt?.stringValue || ''
  };
}

async function verifyToken(env, token) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token })
    }
  );

  const data = await response.json();
  if (!response.ok || !data.users?.[0]) {
    throw new Error('Invalid token');
  }

  return data.users[0].localId;
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}
