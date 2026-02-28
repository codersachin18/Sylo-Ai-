import React from 'react';
import { motion } from 'framer-motion';
import './GetApp.css';
import AppShowcase from '../components/AppShowcase';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { SiWhatsapp, SiTelegram, SiInstagram, SiX, SiTiktok, SiSnapchat, SiGooglechrome, SiGoogle, SiYoutube, SiGoogleplay, SiFacebook, SiGooglemaps, SiAmazon, SiFlipkart } from 'react-icons/si';
import { FaPhone, FaPhoneAlt, FaCamera } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';

const GetApp = () => {
  const appLogos = [
    { name: 'Phone', Icon: FaPhoneAlt, color: '#34C759' },
    { name: 'Call', Icon: FaPhone, color: '#007AFF' },
    { name: 'WhatsApp', Icon: SiWhatsapp, color: '#25D366' },
    { name: 'Telegram', Icon: SiTelegram, color: '#26A5E4' },
    { name: 'Instagram', Icon: SiInstagram, color: '#E4405F' },
    { name: 'Twitter', Icon: SiX, color: '#1DA1F2' },
    { name: 'TikTok', Icon: SiTiktok, color: '#000000' },
    { name: 'Snapchat', Icon: SiSnapchat, color: '#FFFC00' },
    { name: 'Chrome', Icon: SiGooglechrome, color: '#4285F4' },
    { name: 'Google', Icon: SiGoogle, color: '#4285F4' },
    { name: 'Settings', Icon: IoSettings, color: '#8E8E93' },
    { name: 'Camera', Icon: FaCamera, color: '#5856D6' },
    { name: 'YouTube', Icon: SiYoutube, color: '#FF0000' },
    { name: 'Play Store', Icon: SiGoogleplay, color: '#414141' },
    { name: 'Facebook', Icon: SiFacebook, color: '#1877F2' },
    { name: 'Maps', Icon: SiGooglemaps, color: '#4285F4' },
    { name: 'Amazon', Icon: SiAmazon, color: '#FF9900' },
    { name: 'Flipkart', Icon: SiFlipkart, color: '#2874F0' },
  ];

  return (
    <div className="get-app-page">
      <section className="get-app-hero">
        <div className="get-app-hero-container">
          <motion.div 
            className="get-app-hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="get-app-hero-title">
              Download SYLO
              <span className="gradient-text"> Today</span>
            </h1>
            <p className="get-app-hero-subtitle">
              Experience the power of AI-driven voice commands. Control your entire digital workspace with just your voice.
            </p>
            <div className="get-app-hero-buttons">
              <motion.a
                href="https://github.com/codersachin18/sylo-update/releases/download/v1.0.6/SyloAgent-v1.0.6.apk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-download-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download for Android
              </motion.a>
              <motion.button 
                className="btn-download-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled
              >
                Coming Soon for iOS
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            className="get-app-hero-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hero-phones-wrapper">
              <div className="hero-phone-mockup phone-left">
                <div className="phone-frame">
                  <div className="phone-notch"></div>
                  <div className="phone-content">
                    <video 
                      className="phone-video"
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      onContextMenu={(e) => e.preventDefault()}
                      controlsList="nodownload"
                    >
                      <source src="/video-1.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
              
              <div className="hero-phone-mockup phone-right">
                <div className="phone-frame">
                  <div className="phone-notch"></div>
                  <div className="phone-content">
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
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AppShowcase />
      
      <section className="app-commands-section">
        <div className="commands-container">
          <h2 className="commands-title">App Opening Interaction</h2>
          <p className="commands-subtitle">Open any apps by command</p>
          
          <div className="logo-scroll-container">
            <div className="logo-scroll">
              {[...appLogos, ...appLogos].map((app, index) => (
                <div 
                  key={index} 
                  className="app-logo-card"
                  style={{ '--app-color': app.color }}
                >
                  <app.Icon className="app-icon" />
                  <span className="app-name">{app.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
};

export default GetApp;
