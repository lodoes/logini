// pages/Residences.js
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import Pagination from '../components/Pagination';
import ResidenceCard from '../components/ResidenceCard';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import styles from '../styles/Residences.module.css';
import 'react-range-slider-input/dist/style.css';
import RangeSlider from 'react-range-slider-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faDollarSign, faSearch } from '@fortawesome/free-solid-svg-icons';

const Residences = () => {
  const [residences, setResidences] = useState([]);
  const [filteredResidences, setFilteredResidences] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResidence, setSelectedResidence] = useState(null);
  const resultsPerPage = 20;

  const [searchText, setSearchText] = useState('');
  const [departement, setDepartement] = useState('');
  const [disponibilite, setDisponibilite] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const router = useRouter();
  const { disponibilite: queryDisponibilite, search: querySearchText, departement: queryDepartement } = router.query;

  useEffect(() => {
    const fetchResidences = async () => {
      const { data, error } = await supabase.from('residences').select('*');
      if (error) {
        console.error('Erreur lors de la récupération des résidences:', error);
      } else {
        setResidences(data);

        // Initialiser le filtre avec les valeurs de l'URL si elles sont présentes
        let initialFiltered = data;

        // Appliquer le filtre de disponibilité
        if (queryDisponibilite === 'disponible') {
          initialFiltered = initialFiltered.filter((residence) =>
            residence.disponibilite.toLowerCase() === 'disponible'
          );
          setDisponibilite(queryDisponibilite);
        }

        // Appliquer le filtre de recherche si présent dans l'URL
        if (querySearchText) {
          initialFiltered = initialFiltered.filter((residence) =>
            residence.nom.toLowerCase().includes(querySearchText.toLowerCase()) ||
            residence.type.toLowerCase().includes(querySearchText.toLowerCase()) ||
            residence.ville.toLowerCase().includes(querySearchText.toLowerCase()) ||
            residence.departement.toLowerCase().includes(querySearchText.toLowerCase())
          );
          setSearchText(querySearchText);
        }

        // Appliquer le filtre de département si présent dans l'URL
        if (queryDepartement) {
          initialFiltered = initialFiltered.filter((residence) =>
            residence.departement.toLowerCase().includes(queryDepartement.toLowerCase())
          );
          setDepartement(queryDepartement);
        }

        setFilteredResidences(initialFiltered);
      }
    };

    fetchResidences();
  }, [queryDisponibilite, querySearchText, queryDepartement]);

  const handleRangeChange = (values) => {
    const [min, max] = values;
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleFilter = () => {
    let filtered = residences;

    if (disponibilite) {
      filtered = filtered.filter((residence) =>
        residence.disponibilite.toLowerCase() === disponibilite.toLowerCase()
      );
    }

    if (departement) {
      filtered = filtered.filter((residence) =>
        residence.departement.toLowerCase().includes(departement.toLowerCase())
      );
    }

    if (minPrice || maxPrice) {
      filtered = filtered.filter((residence) =>
        parseFloat(residence.prix) >= minPrice && parseFloat(residence.prix) <= maxPrice
      );
    }

    if (searchText) {
      filtered = filtered.filter((residence) =>
        residence.type.toLowerCase().includes(searchText.toLowerCase()) ||
        residence.nom.toLowerCase().includes(searchText.toLowerCase()) ||
        residence.departement.toLowerCase().includes(searchText.toLowerCase()) ||
        residence.ville.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredResidences(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleFilter();
  }, [searchText, departement, disponibilite, minPrice, maxPrice]);

  // Fonction pour supprimer un filtre individuel
  const removeFilter = (type) => {
    if (type === 'searchText') setSearchText('');
    else if (type === 'departement') setDepartement('');
    else if (type === 'disponibilite') setDisponibilite('');
    else if (type === 'price') {
      setMinPrice(0);
      setMaxPrice(1000);
    }
  };

  // Rendu des tags de filtres actifs
  const renderActiveFilters = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      {searchText && (
        <FilterTag type="search" label={`${searchText}`} onRemove={() => removeFilter('searchText')} />
      )}
      {departement && (
        <FilterTag type="location" label={`${departement}`} onRemove={() => removeFilter('departement')} />
      )}
      {disponibilite && (
        <FilterTag type="availability" label={`${disponibilite}`} onRemove={() => removeFilter('disponibilite')} />
      )}
      {(minPrice > 0 || maxPrice < 1000) && (
        <FilterTag type="price" label={`${minPrice}€ - ${maxPrice}€`} onRemove={() => removeFilter('price')} />
      )}
    </div>
  );

  // Composant pour un tag de filtre individuel avec icon customization
  const FilterTag = ({ label, type, onRemove }) => {
    const getIcon = () => {
      switch (type) {
        case 'location':
          return faMapMarkerAlt;
        case 'price':
          return faDollarSign;
        case 'availability':
          return faCalendarAlt;
        case 'search':
          return faSearch;
        default:
          return faTag;
      }
    };

    return (
      <div className={styles.filterTag}>
        <FontAwesomeIcon icon={getIcon()} className="icon" />
        <span>{label}</span>
        <button onClick={onRemove}>×</button>
      </div>
    );
  };

  // Rendu du composant
  return (
    <>
      <Navbar />

      <div className={styles.container}>
      

        {/* Options de filtres */}
        <div className={styles.filtersRow}>
          <input
            type="text"
            placeholder="Rechercher par nom, département, ville..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={styles.searchInput}
          />

          <div className={styles.filterGroup}>
            <label htmlFor="departementSelect" className={styles.filterLabel}>Département:</label>
            <select
              id="departementSelect"
              value={departement}
              onChange={(e) => setDepartement(e.target.value)}
              className={styles.select}
            >
              <option value="">Tous les départements</option>
              {residences
                .map((residence) => residence.departement)
                .filter((v, i, a) => a.indexOf(v) === i)
                .map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="disponibiliteSelect" className={styles.filterLabel}>Disponibilité:</label>
            <select
              id="disponibiliteSelect"
              value={disponibilite}
              onChange={(e) => setDisponibilite(e.target.value)}
              className={styles.select}
            >
              <option value="">Tous</option>
              <option value="Disponible">Disponible</option>
              <option value="Bientôt disponible">Bientôt Disponible</option>
              <option value="Non disponible">Indisponible</option>
              <option value="Non renseigné">Non renseigné</option>
            </select>
          </div>

          <div className={styles.sliderContainer}>
            <label>Prix maximum: {minPrice}€ - {maxPrice}€</label>
            <RangeSlider
              min={0}
              max={1000}
              step={10}
              defaultValue={[minPrice, maxPrice]}
              onInput={handleRangeChange}
              thumbsDisabled={[false, false]}
              rangeSlideDisabled={false}
            />
          </div>
        </div>
          {/* Affichage des tags des filtres actifs */}
          {renderActiveFilters()}

        <div className={styles.cardGrid}>
          {filteredResidences.length > 0 ? (
            filteredResidences.slice(
              (currentPage - 1) * resultsPerPage,
              currentPage * resultsPerPage
            ).map((residence) => (
              <div key={residence.id} onClick={() => setSelectedResidence(residence)}>
                <ResidenceCard residence={residence} />
              </div>
            ))
          ) : (
            <p>Aucune résidence trouvée.</p>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalResults={filteredResidences.length}
          resultsPerPage={resultsPerPage}
          onPageChange={setCurrentPage}
        />

        <Modal
          show={!!selectedResidence}
          handleClose={() => setSelectedResidence(null)}
          residence={selectedResidence}
        />
      </div>
    </>
  );
};

export default Residences;