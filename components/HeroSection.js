// components/HeroSection.js
"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const HeroSection = () => {
  const [residenceCount, setResidenceCount] = useState(0);

  useEffect(() => {
    const fetchResidenceCount = async () => {
      const { count, error } = await supabase
        .from('residences')
        .select('*', { count: 'exact', head: true }); // Utilise `head: true` pour ne récupérer que le nombre

      if (error) {
        console.error('Erreur lors de la récupération du nombre de résidences:', error);
      } else {
        setResidenceCount(count || 0);
      }
    };

    fetchResidenceCount();
  }, []);

  return (
    <section className="relative flex justify-center items-center bg-gradient-to-r from-purple-50 to-indigo-50 p-16  shadow-md overflow-hidden">
      {/* Background Decorative Circle */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-80 h-80 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex items-center space-x-10">
        {/* Left Side: Text Content */}
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-indigo-700 leading-tight">
            {residenceCount.toLocaleString()} Résidences étudiantes pour vous
          </h1>
          <p className="text-gray-700 mt-6 text-lg">
            Découvrez une large gamme de résidences dans des emplacements privilégiés. Trouvez l'endroit parfait pour vous sentir chez vous.
          </p>
          <button className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
            Trouvez votre résidence
          </button>
        </div>

        {/* Right Side: Decorative Cards */}
        <div className="relative flex flex-col items-center space-y-8">
          {/* Decorative Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-xl w-60 transform hover:scale-105 transition-transform duration-200">
            <h3 className="text-lg font-semibold text-indigo-700">Résidence pour étudiants</h3>
            <p className="text-gray-500 mt-2">Idéal pour les étudiants, stagiaires et apprentis</p>
            <p className="text-indigo-600 font-bold mt-4">250€ - 700€/mois</p>
          </div>

          {/* Decorative Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-xl w-60 transform hover:scale-105 transition-transform duration-200">
            <h3 className="text-lg font-semibold text-indigo-700">Résidence pour jeunes actifs</h3>
            <p className="text-gray-500 mt-2">Idéal pour les premières années dans le monde professionnel</p>
            <p className="text-indigo-600 font-bold mt-4">800€ - 1000€/mois</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
