import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './AppShowcase.css';

const AppShowcase = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });

  const phoneVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="app-showcase" ref={ref}>
      <div className="showcase-container">
        <motion.div 
          className="phone-mockup phone-1"
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={phoneVariants}
        >
          <div className="phone-frame">
            <div className="phone-notch"></div>
            <div className="phone-content">
              <video 
                className="phone-image"
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
        </motion.div>

        <motion.div 
          className="phone-mockup phone-2"
          custom={1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={phoneVariants}
        >
          <div className="phone-frame">
            <div className="phone-notch"></div>
            <div className="phone-content">
              <video 
                className="phone-image"
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
        </motion.div>

        <motion.div 
          className="phone-mockup phone-3"
          custom={2}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={phoneVariants}
        >
          <div className="phone-frame">
            <div className="phone-notch"></div>
            <div className="phone-content">
              <img src="/screenshot-1.jpg" alt="Sylo AI App Screen 3" className="phone-image" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppShowcase;
