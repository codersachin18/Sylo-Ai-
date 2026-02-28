import React from 'react';
import './FeaturesPage.css';
import Features from '../components/Features';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const FeaturesPage = () => {
  return (
    <div className="features-page">
      <Features />
      <Contact />
      <Footer />
    </div>
  );
};

export default FeaturesPage;
