"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import ResidenceCard from './ResidenceCard';

const LatestResidences = () => {
  const [diverseResidences, setDiverseResidences] = useState([]);

  useEffect(() => {
    const fetchDiverseResidences = async () => {
      // Récupérer toutes les résidences disponibles
      const { data, error } = await supabase
        .from('residences')
        .select('*')
        .eq('disponibilite', 'Disponible');

      if (error) {
        console.error('Erreur lors de la récupération des résidences:', error);
      } else {
        // Filtrer pour obtenir un maximum de 3 types de résidences uniques
        const uniqueTypes = [];
        const residencesByType = data.reduce((acc, residence) => {
          if (!uniqueTypes.includes(residence.type) && acc.length < 3) {
            acc.push(residence);
            uniqueTypes.push(residence.type);
          }
          return acc;
        }, []);

        setDiverseResidences(residencesByType);
      }
    };

    fetchDiverseResidences();
  }, []);

  // Fonction de redirection vers la page avec le filtre "disponible"
  const handleSeeMore = () => {
    window.location.href = '/residences?disponibilite=disponible';
  };

  return (
    <section className="p-10 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center text-indigo-700">Résidences Disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {diverseResidences.length > 0 ? (
          diverseResidences.map((residence) => (
            <ResidenceCard key={residence.id} residence={residence} />
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">Aucune résidence disponible.</p>
        )}
      </div>
      <button
        onClick={handleSeeMore}
        className="block mx-auto mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700 transition-colors duration-200"
      >
        Voir plus
      </button>
    </section>
  );
};

export default LatestResidences;
