// pages/index.js
import React from 'react';
import HeroSection from '../components/HeroSection';
import ExploreSection from '../components/ExploreSection';
import LatestResidences from '../components/LatestResidences';
import TopAgencies from '../components/TopAgencies';
import ProfileSection from '../components/ProfileSection';
import RealEstateAdvice from '../components/RealEstateAdvice';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <LatestResidences />
      <ExploreSection />

    </>
  );
};

export default HomePage;
