import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Download.css';

const Download = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });

  return (
    <section className="download" ref={ref}>
      <div className="download-container">
        <motion.div 
          className="download-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="download-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Download Sylo App Now
          </motion.h2>
          
          <motion.p 
            className="download-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Your AI-Powered Android Assistant
          </motion.p>
          
          <motion.p 
            className="download-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Sylo AI is a powerful Android voice assistant that can answer questions, generate text, 
            reason intelligently, and execute real tasks on your phone using simple voice commands.
            <br /><br />
            Sylo doesn't just reply — it understands, thinks, and acts. It can provide smart answers, 
            explain topics clearly, and reason step-by-step to solve problems. Along with intelligent 
            conversations, Sylo can control your Android device, allowing you to open apps, make calls, 
            send messages, and perform actions hands-free.
          </motion.p>
          
          <motion.div 
            className="download-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.a
              href="https://github.com/codersachin18/sylo-update/releases/download/v1.0.6/SyloAgent-v1.0.6.apk"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-download primary"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M17.523 7C17.8 7 18 7.2 18 7.5V16c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V7.5c0-.3.2-.5.5-.5h11.023zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
              Download for Android
            </motion.a>
            
            <motion.button 
              className="btn-download secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Coming Soon for iOS
            </motion.button>
          </motion.div>
          
          <motion.p 
            className="download-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            * Sylo app is currently available for Android devices only. iOS version is under development.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="download-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="phone-showcase">
            <div className="phone-device">
              <div className="phone-screen">
                <video 
                  className="phone-video"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  onContextMenu={(e) => e.preventDefault()}
                  controlsList="nodownload"
                >
                  <source src="/video-2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Download;
