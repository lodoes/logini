// pages/index.js
import React from 'react';
import HeroSection from '../components/HeroSection';
import ExploreSection from '../components/ExploreSection';
import LatestResidences from '../components/LatestResidences';

import Navbar from '../components/Navbar'

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ExploreSection />
      <LatestResidences />


    </>
  );
};

export default HomePage;
