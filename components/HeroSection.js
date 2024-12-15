// components/HeroSection.js
"use client";

import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative flex flex-col md:flex-row justify-center items-center bg-white p-8 md:p-16 shadow-md overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-40 h-40 md:w-80 md:h-80 bg-gradient-to-b from-sky-400 to-blue rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center md:gap-x-40 space-y-10 md:space-y-0">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold text-blue leading-tight">
            245 Résidences étudiantes pour vous
          </h1>
          <p className="text-gray-700 mt-6 md:mt-8 text-base md:text-lg">
            Découvrez une large gamme de résidences dans des emplacements privilégiés. Trouvez l&apos;endroit parfait pour vous sentir chez vous.
          </p>
          <Link href="/residences" className="mt-8 md:mt-10 inline-block bg-blue text-white py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200" aria-label="Trouver votre résidence">
              Trouvez votre résidence
            
          </Link>
        </div>

        <div className="relative hidden md:flex flex-col items-center space-y-10">
          <div className="bg-white p-6 rounded-lg shadow-xl w-60 md:w-80 transform hover:scale-105 transition-transform duration-200">
            <h3 className="text-lg font-semibold text-blue">Résidence pour étudiants</h3>
            <p className="text-gray-500 mt-4 text-base">Idéal pour les étudiants, stagiaires et apprentis</p>
            <p className="text-gray-800 font-bold mt-6 text-base">250€ - 700€/mois</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-xl w-60 md:w-80 transform hover:scale-105 transition-transform duration-200">
            <h3 className="text-lg font-semibold text-blue">Résidence pour jeunes actifs</h3>
            <p className="text-gray-500 mt-4 text-base">Idéal pour les premières années dans le monde professionnel</p>
            <p className="text-gray-800 font-bold mt-6 text-base">500€ - 1000€/mois</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
