// components/ExploreSection.js
"use client";

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { supabase } from '../lib/supabaseClient';

const categories = [
  { logo: '/logos/studefi.png', name: 'STUDEFI' },
  { logo: '/logos/fac-habitat.png', name: 'FAC HABITAT' },
  { logo: '/logos/arpej.png', name: 'ARPEJ' },
  { logo: '/logos/aref.png', name: 'Aref' },
  { logo: '/logos/aljt.png', name: 'ALJT' },
  { logo: '/logos/agefo.png', name: 'AGEFO' },
  { logo: '/logos/relais-jeunes.png', name: 'Relais Jeune' },
  { logo: '/logos/kamino.png', name: 'Kamino' },
  { logo: '/logos/logifac.png', name: 'Logifac' }
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

  const handleSearch = () => {
    if (selectedDepartment || searchText) {
      window.location.href = `/residences?departement=${selectedDepartment}&search=${searchText}`;
    }
  };

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
            className="w-full p-3 pl-10 border rounded-lg outline-none focus:border-indigo-600 text-black"
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
          <option value="Seine-Saint-Denis (93)">Seine-Saint-Denis (93)</option>
          <option value="Val-de-Marne (94)">Val-de-Marne (94)</option>
          <option value="Seine-et-Marne (77)">Seine-et-Marne (77)</option>
          <option value="Val-d&apos;Oise (95)">Val-d&apos;Oise (95)</option>
          <option value="Yvelines (78)">Yvelines (78)</option>
          <option value="Hauts-de-Seine (92)">Hauts-de-Seine (92)</option>
          <option value="Paris (75)">Paris (75)</option>
          <option value="Essonne (91)">Essonne (91)</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 w-48 md:w-auto"
        >
          Rechercher
        </button>
      </div>

      {/* Carrousel de catégories */}
      <div className="flex justify-center w-full">
        <Slider {...settings} className="w-[90%] max-w-[1200px]">
          {categories.map((category, index) => {
            const count = residences.filter(
              (residence) => residence.type === category.name
            ).length;

            return (
              <div
                key={index}
                onClick={() => handleCategorySearch(category.name)}
                className="flex flex-col items-center justify-center p-6 transition-transform transform hover:scale-105 text-center cursor-pointer"
              >
                <div className="flex items-center justify-center h-24  mb-4">
                  <img
                    src={category.logo}
                    alt={`${category.name} logo`}
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="font-semibold text-black text-center mt-2">{category.name}</h3>
                <p className="text-gray-600 text-center mt-1">{count} résidences</p>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default ExploreSection;
