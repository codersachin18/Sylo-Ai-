import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Orb from "../components/Orb";
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        className={`navbar ${scrolled ? 'scrolled' : ''} ${location.pathname === '/chat' ? 'chat-page-nav' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="navbar-container">
          {location.pathname !== '/chat' && (
            <Link to="/" style={{ textDecoration: 'none' }}>
              <motion.div 
                className="navbar-logo"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    height: '45px',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '58px',
                    }}
                  >
                    <Orb
                      hoverIntensity={2}
                      rotateOnHover
                      hue={0}
                      forceHoverState={false}
                      backgroundColor="#000000"
                    />
                  </div>
                  <span className="hero-logoorbs">
                    SYLO
                  </span>
                </div>
              </motion.div>
            </Link>
          )}

          {location.pathname !== '/chat' && (
            <div className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/chat" 
                className={location.pathname === '/chat' ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Sylo AI
              </Link>
              <Link 
                to="/get-app" 
                className={`get-app-link ${location.pathname === '/get-app' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Get App
              </Link>
              <Link 
                to="/features" 
                className={location.pathname === '/features' ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              {!isAuthenticated && (
                <button 
                  className="btn-login mobile-only"
                  onClick={() => {
                    setAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign Up / Log In
                </button>
              )}
            </div>
          )}

          <div className="navbar-actions">
            {!isAuthenticated && (
              <motion.button 
                className="btn-login desktop-only"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAuthModalOpen(true)}
              >
                Sign Up / Log In
              </motion.button>
            )}
            <motion.a
              href="https://github.com/codersachin18/sylo-update/releases/download/v1.0.6/SyloAgent-v1.0.6.apk"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-start"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              Download App
            </motion.a>
          </div>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </motion.nav>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
