import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Orb from "../components/Orb";
import './Hero.css';

const Hero = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate('/chat', { state: { message: inputValue } });
    }
  };

  return (
    <motion.section 
      className="hero"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >

      
      <div className="hero-container">
       

<div
  style={{
    width: '100%',
    height: 'px',          // bigger hero height
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  {/* Orb */}
  <div
    style={{
      width: '100%',         // ⬅ orb size
      height: '200px',
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

  {/* Center text */}
  <div
    style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: 10,
    }}
  >
    <span  className="hero-logoorb"
       
    >
      SYLO
    </span>
  </div>
</div>
        <motion.div 
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="badge-glow"></span>
          Made with AI magic
        </motion.div>

        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          More Than Chat. It Takes Action.
        </motion.h1>

        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Sylo AI doesn't just answer — it calls, opens apps, sends messages, and gets things done on your device instantly.
        </motion.p>

        <motion.div 
          className="hero-input-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <form onSubmit={handleSubmit} className="input-wrapper">
            <input
              type="text"
              placeholder="Ask Anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="hero-input"
            />
            <motion.button 
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="submit-icon">→</div>
            </motion.button>
          </form>
          <div className="input-glow"></div>
        </motion.div>

        <div className="hero-orbs">
          <motion.div 
            className="orb orb-1"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="orb orb-2"
            animate={{
              y: [0, 20, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="orb orb-3"
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
