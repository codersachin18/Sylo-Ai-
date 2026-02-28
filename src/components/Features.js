import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Features.css';

const Features = () => {
  const { ref: titleRef, inView: titleInView } = useInView({ 
    threshold: 0.3, 
    triggerOnce: false 
  });

  const features = [
    {
      title: 'Sylo AI Assistant',
      description: 'Answer anything - reasoning, thinking, coding, writing, and more',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
      commands: [
        { input: 'Write a poem about AI', reply: 'In circuits deep and code so bright...' },
        { input: 'Explain quantum computing', reply: 'Quantum computing uses quantum bits...' }
      ]
    },
    {
      title: 'Sylo Answers',
      description: 'Get instant responses to any question with AI-powered intelligence',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
      commands: [
        { input: 'What is the capital of France?', reply: 'The capital of France is Paris.' },
        { input: 'How does photosynthesis work?', reply: 'Photosynthesis converts light energy...' }
      ]
    },
    {
      title: 'Mobile App Control',
      description: 'Open apps by command - "Open WhatsApp", "Open YouTube", and more',
      gradient: 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%)',
      commands: [
        { input: 'Open WhatsApp', reply: 'Opening WhatsApp...' },
        { input: 'Open YouTube', reply: 'Launching YouTube app...' }
      ]
    },
    {
      title: 'Smart Communication',
      description: 'Make calls, send messages - "Call John", "Message mom I\'m coming"',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
      commands: [
        { input: 'Call John', reply: 'Calling John...' },
        { input: 'Message mom: I\'m coming', reply: 'Message sent to mom.' }
      ]
    }
  ];

  return (
    <section className="features">
      <div className="features-container">
        <motion.div 
          className="features-header"
          ref={titleRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: titleInView ? 1 : 0, 
            y: titleInView ? 0 : 50 
          }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="features-title">
            Features that <span className="italic-text">speed up</span>
            <br />
            your workflow
          </h2>
          <p className="features-subtitle">
            Everything you need to go from idea to production without the
            <br />
            setup, boilerplate, or headaches
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ feature, index }) => {
  const { ref, inView } = useInView({ 
    threshold: 0.2, 
    triggerOnce: false 
  });

  const [currentCommand, setCurrentCommand] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showReply, setShowReply] = useState(false);
  const [showThinking, setShowThinking] = useState(false);

  useEffect(() => {
    if (!inView) return;

    const command = feature.commands[currentCommand];
    let charIndex = 0;
    
    // Reset states
    setTypedText('');
    setShowReply(false);
    setShowThinking(false);

    // Typing animation (extra slow speed)
    const typingInterval = setInterval(() => {
      if (charIndex < command.input.length) {
        setTypedText(command.input.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        
        // Show thinking after typing
        setTimeout(() => {
          setShowThinking(true);
          
          // Show reply after thinking
          setTimeout(() => {
            setShowThinking(false);
            setShowReply(true);
            
            // Switch to next command
            setTimeout(() => {
              setCurrentCommand((prev) => (prev + 1) % feature.commands.length);
            }, 6000);
          }, 4000);
        }, 1500);
      }
    }, 200);

    return () => clearInterval(typingInterval);
  }, [currentCommand, inView, feature.commands]);

  const isLargeCard = index >= 3;

  return (
    <motion.div
      ref={ref}
      className={`feature-card ${isLargeCard ? 'large-card' : ''} ${index === 2 ? 'highlighted' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: inView ? 1 : 0, 
        y: inView ? 0 : 50 
      }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="card-glow" style={{ background: feature.gradient }}></div>
      
      <div className="card-content">
        <h3 className="card-title">{feature.title}</h3>
        <p className="card-description">{feature.description}</p>
        
        <div className="command-demo">
          <div className="command-input-wrapper">
            <div className="command-input">
              <span className="input-text">{typedText}</span>
              <motion.span 
                className="cursor"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                |
              </motion.span>
            </div>
            <motion.button 
              className="send-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={typedText.length === feature.commands[currentCommand].input.length ? {
                scale: [1, 1.2, 1]
              } : {}}
              transition={{ duration: 0.3 }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </motion.button>
          </div>
          
          {showThinking && (
            <motion.div 
              className="thinking-indicator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="thinking-dots">
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </div>
              <span className="thinking-text">Thinking...</span>
            </motion.div>
          )}
          
          {showReply && (
            <motion.div 
              className="command-reply"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="reply-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                </svg>
              </div>
              <span>{feature.commands[currentCommand].reply}</span>
            </motion.div>
          )}
        </div>
      </div>
      
      <motion.div 
        className="card-particles"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Features;
