import React from 'react';
import Orb from './Orb';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              height: '45px',
              justifyContent: 'center',
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
            <span className="footer-logo-text">
              SYLO
            </span>
          </div>
        </div>
        
        <div className="footer-copyright">
          <p>&copy; {currentYear} Sylo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
