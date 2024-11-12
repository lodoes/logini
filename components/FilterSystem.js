// components/FilterSystem.js
import React, { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const FilterSystem = ({ onApplyFilters, initialMinPrice = 0, initialMaxPrice = 1000 }) => {
  const [filters, setFilters] = useState([]);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);

  // Fonction pour ajouter un filtre
  const addFilter = (type, value) => {
    setFilters((prevFilters) => [
      ...prevFilters,
      { type, value, id: `${type}-${value}` },
    ]);
  };

  // Fonction pour supprimer un filtre
  const removeFilter = (filterId) => {
    setFilters((prevFilters) => prevFilters.filter((f) => f.id !== filterId));
  };

  // Appliquer les filtres
  const applyFilters = () => {
    onApplyFilters({ filters, minPrice, maxPrice });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map((filter) => (
          <FilterTag
            key={filter.id}
            type={filter.type}
            value={filter.value}
            onRemove={() => removeFilter(filter.id)}
          />
        ))}
      </div>

      {/* Filtre par texte */}
      <input
        type="text"
        placeholder="Rechercher..."
        onBlur={(e) => addFilter('Search', e.target.value)}
        className="border rounded p-2 mb-4"
      />

      {/* Filtre par département */}
      <FilterDropdown
        label="Département"
        options={['93', '94', '75', '92']}
        onSelect={(value) => addFilter('Département', value)}
      />

      {/* Filtre par disponibilité */}
      <FilterDropdown
        label="Disponibilité"
        options={['Disponible', 'Bientôt disponible', 'Indisponible']}
        onSelect={(value) => addFilter('Disponibilité', value)}
      />

      {/* Slider pour le prix */}
      <div className="my-4">
        <label>Prix: {minPrice}€ - {maxPrice}€</label>
        <RangeSlider
          min={initialMinPrice}
          max={initialMaxPrice}
          step={10}
          defaultValue={[minPrice, maxPrice]}
          onInput={(values) => {
            setMinPrice(values[0]);
            setMaxPrice(values[1]);
          }}
        />
      </div>

      <button onClick={applyFilters} className="bg-blue-500 text-white p-2 rounded">Appliquer les Filtres</button>
    </div>
  );
};

// Composant pour afficher chaque filtre sous forme de tag
const FilterTag = ({ type, value, onRemove }) => (
  <div className="flex items-center gap-2 bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
    <span>{type}: {value}</span>
    <button onClick={onRemove} className="ml-2 text-gray-500 hover:text-gray-800">
      &times;
    </button>
  </div>
);

// Dropdown de filtre
const FilterDropdown = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button onClick={() => setIsOpen(!isOpen)} className="bg-gray-100 border px-4 py-2 rounded-full text-gray-700">
        {label}
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white border rounded shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSystem;
