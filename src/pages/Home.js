import React from 'react';
import Hero from '../components/Hero';
import Download from '../components/Download';
import AppShowcase from '../components/AppShowcase';
import Features from '../components/Features';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Hero />
      <Download />
      <AppShowcase />
      <Features />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
