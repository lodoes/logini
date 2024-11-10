"use client";

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { supabase } from '../lib/supabaseClient';

const categories = [
  { icon: '💻', name: 'STUDEFI' },
  { icon: '🎓', name: 'FAC HABITAT' },
  { icon: '💰', name: 'ARPEJ' },
  { icon: '🏠', name: 'Aref' },
  { icon: '🏢', name: 'ALJT' },
  { icon: '🏫', name: 'AGEFO' },
  { icon: '🌱', name: 'Relais Jeune' },
  { icon: '🌍', name: 'Kamino' },
  { icon: '🏡', name: 'ALFI' },
  { icon: '📈', name: 'Logifac' }
];

const ExploreSection = () => {
  const [residences, setResidences] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchResidences = async () => {
      const { data, error } = await supabase.from('residences').select('*');
      if (error) {
        console.error('Error fetching residences:', error);
      } else {
        setResidences(data);
      }
    };

    fetchResidences();
  }, []);

  // Fonction pour déclencher une recherche avec le département et le texte de recherche
  const handleSearch = () => {
    if (selectedDepartment || searchText) {
      window.location.href = `/residences?departement=${selectedDepartment}&search=${searchText}`;
    }
  };

  // Fonction pour rechercher par catégorie lorsque l'utilisateur clique sur une catégorie
  const handleCategorySearch = (categoryName) => {
    window.location.href = `/residences?search=${categoryName}`;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="text-center py-16 bg-white">
      <h2 className="text-3xl font-semibold mb-8 text-black">
        Découvrez plus de <span className="text-indigo-600">résidences</span>
      </h2>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row justify-center items-center mb-10 space-y-4 md:space-y-0 md:space-x-2 max-w-3xl mx-auto">
        <div className="relative flex-grow w-72 md:w-auto">
          <input
            type="text"
            placeholder="Cherchez par nom, lieu, type"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full p-3 pl-10 border rounded-lg outline-none focus:border-indigo-600"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
        <select
          className="p-3 border text-black rounded-lg outline-none focus:border-indigo-600 w-72 md:w-auto"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">Département</option>
          <option value="93">Seine-Saint-Denis (93)</option>
          <option value="94">Val-de-Marne (94)</option>
          <option value="77">Seine-et-Marne (77)</option>
          <option value="95">Val-d&apos;Oise (95)</option>
          <option value="78">Yvelines (78)</option>
          <option value="92">Hauts-de-Seine (92)</option>
          <option value="75">Paris (75)</option>
          <option value="91">Essonne (91)</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 w-48 md:w-auto"
        >
          Rechercher
        </button>
      </div>

      {/* Carrousel de catégories */}
      <Slider {...settings} className="py-1 max-w-full mx-auto overflow-hidden mx-10">
        {categories.map((category, index) => {
          const count = residences.filter(
            (residence) => residence.type === category.name
          ).length;

          return (
            <div
              key={index}
              onClick={() => handleCategorySearch(category.name)} // Redirige avec le nom de la catégorie comme recherche
              className="flex flex-col items-center p-6 w-40 transition-transform transform hover:scale-20 text-center cursor-pointer"
            >
              <div className="text-3xl mb-4">{category.icon}</div>
              <h3 className="font-semibold text-black">{category.name}</h3>
              <p className="text-gray-600">{count} propriétés</p>
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default ExploreSection;
