// API Service for Sylo AI

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://sylo-ai-backend.YOUR-SUBDOMAIN.workers.dev';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('sylo_token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('sylo_token', token);
    } else {
      localStorage.removeItem('sylo_token');
    }
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  async sendMessage(message, model, conversationHistory = []) {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ message, model, conversationHistory })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send message');
    }

    return response.json();
  }

  async signup(email, password, name) {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }

    this.setToken(data.user.token);
    return data.user;
  }

  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    this.setToken(data.user.token);
    return data.user;
  }

  logout() {
    this.setToken(null);
    localStorage.removeItem('sylo_user');
  }

  async getHistory() {
    const response = await fetch(`${API_BASE_URL}/api/history`, {
      method: 'GET',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to get history');
    }

    const data = await response.json();
    return data.history;
  }

  async saveHistory(sessionId, title, messages) {
    const response = await fetch(`${API_BASE_URL}/api/history`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ sessionId, title, messages })
    });

    if (!response.ok) {
      throw new Error('Failed to save history');
    }

    return response.json();
  }

  async getSession(sessionId) {
    const response = await fetch(`${API_BASE_URL}/api/history/session?sessionId=${sessionId}`, {
      method: 'GET',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to get session');
    }

    const data = await response.json();
    return data.session;
  }

  isAuthenticated() {
    return !!this.token;
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('sylo_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  saveCurrentUser(user) {
    localStorage.setItem('sylo_user', JSON.stringify(user));
  }
}

export default new ApiService();
