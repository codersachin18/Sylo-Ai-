import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './ChatPage.css';
import Orb from '../components/Orb';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';
import loadingAnimation from '../loading-animation.json';

const ChatPage = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [message, setMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('Sylo Gen-6.7');
  const [chatHistory, setChatHistory] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [guestMessageCount, setGuestMessageCount] = useState(0);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const MESSAGE_LIMIT = 20; // Limit for guest users

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isLoading]);

  // Auto-resize textarea
  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    
    // Auto-resize
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  };

  // Reset textarea height when message is sent
  useEffect(() => {
    if (message === '' && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [message]);

  const suggestions = [
    'Explain quantum computing',
    'Write a Python script',
    'Create a marketing plan',
    'Design a logo concept'
  ];

  // Load history on mount if user is logged in
  useEffect(() => {
    if (isAuthenticated) {
      loadHistory();
      setGuestMessageCount(0); // Reset count when user logs in
      setShowAuthModal(false); // Close modal if open
    }
  }, [isAuthenticated]);

  // Save session when user leaves the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isAuthenticated && chatHistory.length > 0) {
        saveCurrentSession();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isAuthenticated, chatHistory, currentSessionId]);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      handleSendMessage(location.state.message);
    }
  }, [location.state]);

  // Auto-save chat history when messages change
  useEffect(() => {
    if (isAuthenticated && chatHistory.length > 0) {
      // Create session ID on first message if not exists
      if (!currentSessionId) {
        const newSessionId = Date.now().toString();
        setCurrentSessionId(newSessionId);
      }
      
      // Save after a short delay to batch updates
      const timer = setTimeout(() => {
        saveCurrentSession();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [chatHistory, isAuthenticated]);

  const loadHistory = async () => {
    try {
      const history = await apiService.getHistory();
      setConversations(history.map(session => ({
        id: session.sessionId,
        title: session.title,
        date: formatDate(session.updatedAt),
        messages: session.messages
      })));
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  const saveCurrentSession = async () => {
    if (!isAuthenticated || chatHistory.length === 0) return;
    
    const sessionId = currentSessionId || Date.now().toString();
    const title = chatHistory[0]?.text.substring(0, 50) || 'New Chat';

    try {
      await apiService.saveHistory(sessionId, title, chatHistory);
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  };

  const handleSendMessage = async (msg = message) => {
    if (msg.trim() && !isLoading) {
      // Check if guest user has reached message limit
      if (!isAuthenticated && guestMessageCount >= MESSAGE_LIMIT) {
        setShowAuthModal(true);
        return;
      }

      const userMessage = { type: 'user', text: msg };
      setChatHistory(prev => [...prev, userMessage]);
      setMessage('');
      setIsLoading(true);

      // Increment guest message count
      if (!isAuthenticated) {
        setGuestMessageCount(prev => prev + 1);
      }

      try {
        const response = await apiService.sendMessage(msg, selectedModel, chatHistory);
        setChatHistory(prev => [...prev, { type: 'ai', text: response.response }]);
      } catch (error) {
        setChatHistory(prev => [...prev, { 
          type: 'ai', 
          text: 'Sorry, I encountered an error. Please try again.' 
        }]);
        console.error('Chat error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleNewChat = async () => {
    // Save current session before starting new one
    if (isAuthenticated && chatHistory.length > 0 && currentSessionId) {
      await saveCurrentSession();
      await loadHistory(); // Refresh history list
    }
    
    setChatHistory([]);
    setMessage('');
    setCurrentSessionId(null);
    setGuestMessageCount(0); // Reset guest message count
  };

  const handleLoadSession = async (sessionId) => {
    try {
      const session = await apiService.getSession(sessionId);
      if (session) {
        setChatHistory(session.messages);
        setCurrentSessionId(sessionId);
        setSidebarOpen(false); // Close sidebar on mobile after loading
      }
    } catch (error) {
      console.error('Failed to load session:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="chat-page">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="mobile-sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Overlay for mobile */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`chat-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo" style={{ textDecoration: 'none' }}>
            <div style={{ width: '32px', height: '38px' }}>
              <Orb
                hoverIntensity={2}
                rotateOnHover
                hue={0}
                forceHoverState={false}
                backgroundColor="#000000"
              />
            </div>
            <span className="sidebar-logo-text">SYLO</span>
          </Link>
        </div>

        <button className="new-chat-btn" onClick={handleNewChat}>
          <span className="plus-icon">+</span>
          New Chat
        </button>

        <div className="sidebar-section">
          <h3 className="section-title">History</h3>
          <div className="history-list">
            {isAuthenticated ? (
              conversations.length > 0 ? (
                conversations.map(conv => (
                  <div 
                    key={conv.id} 
                    className="history-item"
                    onClick={() => handleLoadSession(conv.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="history-title">{conv.title}</div>
                    <div className="history-date">{conv.date}</div>
                  </div>
                ))
              ) : (
                <div className="history-empty">No chat history yet</div>
              )
            ) : (
              <div className="history-empty">Login to save history</div>
            )}
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="account-section">
            <div className="account-icon">👤</div>
            <div className="account-info">
              {isAuthenticated ? (
                <>
                  <div className="account-name">{user?.name || 'User'}</div>
                  <div className="account-email">{user?.email}</div>
                </>
              ) : (
                <>
                  <div className="account-name">Guest User</div>
                  <div className="account-email">Not logged in</div>
                </>
              )}
            </div>
          </div>
          
          {isAuthenticated && (
            <button className="logout-btn" onClick={logout}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Logout
            </button>
          )}
        </div>
      </aside>

      <main className="chat-main">
        <header className="chat-header">
          <div className="model-selector">
            <select 
              value={selectedModel} 
              onChange={(e) => setSelectedModel(e.target.value)}
              className="model-dropdown"
            >
              <option value="Sylo Gen-6.7">Sylo Gen-6.7</option>
              <option value="Sylo Gen-6.1">Sylo Gen-6.1</option>
            </select>
          </div>
        </header>

        <div className="chat-content">
          {chatHistory.length === 0 ? (
            <div className="empty-state">
              <div className="empty-gif-container">
                <img 
                  src="/bubble-effect.gif" 
                  alt="Sylo Animation" 
                  className="empty-gif"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                />
                <div className="gif-text-overlay">SYLO</div>
              </div>
              <h1 className="empty-title">Start Chatting Now</h1>
              <p className="empty-subtitle">Ask me anything and I'll help you out</p>
            </div>
          ) : (
            <div className="messages-container">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                  {msg.type === 'user' ? (
                    <div className="message-content">{msg.text}</div>
                  ) : (
                    <div className="message-content ai-response">
                      <ReactMarkdown
                        components={{
                          code({node, inline, className, children, ...props}) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          },
                          h1: ({node, ...props}) => <h1 className="ai-heading-1" {...props} />,
                          h2: ({node, ...props}) => <h2 className="ai-heading-2" {...props} />,
                          h3: ({node, ...props}) => <h3 className="ai-heading-3" {...props} />,
                          p: ({node, ...props}) => <p className="ai-paragraph" {...props} />,
                          ul: ({node, ...props}) => <ul className="ai-list" {...props} />,
                          ol: ({node, ...props}) => <ol className="ai-list-ordered" {...props} />,
                          li: ({node, ...props}) => <li className="ai-list-item" {...props} />,
                          table: ({node, ...props}) => <table className="ai-table" {...props} />,
                          thead: ({node, ...props}) => <thead className="ai-table-head" {...props} />,
                          tbody: ({node, ...props}) => <tbody className="ai-table-body" {...props} />,
                          tr: ({node, ...props}) => <tr className="ai-table-row" {...props} />,
                          th: ({node, ...props}) => <th className="ai-table-header" {...props} />,
                          td: ({node, ...props}) => <td className="ai-table-cell" {...props} />,
                          blockquote: ({node, ...props}) => <blockquote className="ai-blockquote" {...props} />,
                          strong: ({node, ...props}) => <strong className="ai-bold" {...props} />,
                          em: ({node, ...props}) => <em className="ai-italic" {...props} />,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="message ai">
                  <div className="message-content thinking-message">
                    <div className="thinking-animation">
                      <Lottie 
                        animationData={loadingAnimation} 
                        loop={true}
                        style={{ width: 50, height: 50 }}
                      />
                    </div>
                    <div className="thinking-text">
                      <span className="thinking-dots">Thinking</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="chat-input-area">
          {chatHistory.length === 0 && (
            <div className="suggestions">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="suggestion-chip"
                  onClick={() => {
                    setMessage(suggestion);
                    handleSendMessage(suggestion);
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div className="input-wrapper">
            <textarea
              ref={textareaRef}
              className="chat-input"
              placeholder="Ask Anything..."
              value={message}
              onChange={handleTextareaChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isLoading}
              rows={1}
            />
            <button 
              className="send-btn"
              onClick={() => handleSendMessage()}
              disabled={!message.trim() || isLoading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="input-disclaimer">
            <span>Sylo can make mistakes. Check important info. </span>
            <button 
              className="see-btn"
              onClick={() => setShowDisclaimer(!showDisclaimer)}
            >
              See
            </button>
            
            {showDisclaimer && (
              <div className="disclaimer-card">
                Conversations can be used to train AI and improve performance.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Auth Modal for guest users who reach message limit */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => {
          setShowAuthModal(false);
          // Reset count after closing modal if they don't login
        }} 
      />
    </div>
  );
};

export default ChatPage;
