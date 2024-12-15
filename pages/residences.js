// pages/Residences.js
"use client";

import { useEffect, useState, useCallback } from 'react';
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
import Head from 'next/head'


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

        let initialFiltered = data;

        if (queryDisponibilite === 'disponible') {
          initialFiltered = initialFiltered.filter((residence) =>
            residence.disponibilite.toLowerCase() === 'disponible'
          );
          setDisponibilite(queryDisponibilite);
        }

        if (querySearchText) {
          initialFiltered = initialFiltered.filter((residence) =>
            residence.nom.toLowerCase().includes(querySearchText.toLowerCase()) ||
            residence.type.toLowerCase().includes(querySearchText.toLowerCase()) ||
            residence.ville.toLowerCase().includes(querySearchText.toLowerCase()) ||
            residence.departement.toLowerCase().includes(querySearchText.toLowerCase())
          );
          setSearchText(querySearchText);
        }

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

  const handleFilter = useCallback(() => {
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
  }, [residences, disponibilite, departement, minPrice, maxPrice, searchText]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  const removeFilter = (type) => {
    if (type === 'searchText') setSearchText('');
    else if (type === 'departement') setDepartement('');
    else if (type === 'disponibilite') setDisponibilite('');
    else if (type === 'price') {
      setMinPrice(0);
      setMaxPrice(1000);
    }
  };

  const renderActiveFilters = () => (
    <div className={styles.activeFilters}>
      {searchText && (
        <FilterTag type="search" label={searchText} onRemove={() => removeFilter('searchText')} />
      )}
      {departement && (
        <FilterTag type="location" label={departement} onRemove={() => removeFilter('departement')} />
      )}
      {disponibilite && (
        <FilterTag type="availability" label={disponibilite} onRemove={() => removeFilter('disponibilite')} />
      )}
      {(minPrice > 0 || maxPrice < 1000) && (
        <FilterTag type="price" label={`${minPrice}€ - ${maxPrice}€`} onRemove={() => removeFilter('price')} />
      )}
    </div>
  );

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
      <div className={styles.filterTag} onClick={onRemove} role="button" style={{ cursor: 'pointer' }}>
        <FontAwesomeIcon icon={getIcon()} className="icon" />
        <span>{label}</span>
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }}>×</button>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <div className={styles.container}>
      <Head>
        <title>Logini - Liste des residences</title>
      </Head>
        <div className={styles.filtersContainer}>
          <div className={styles.filtersRow}>
          <div className={styles.filterGroup}>

          <label htmlFor="searchInput" className={styles.filterLabel}>
          Recherche:
        </label>
            <input
              type="text"
              placeholder="Rechercher par nom, département, ville..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={styles.searchInput}
            />
            </div>

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
            <label className={styles.sliderLabel}>Loyer: {minPrice}€ - {maxPrice}€</label>
            <div className={styles.rangeSliderWrapper}></div>
            
              <RangeSlider
                min={0}
                max={1000}
                step={10}
                defaultValue={[minPrice, maxPrice]}
                onInput={handleRangeChange}
                className={styles.slider}
              />
            </div>
          </div>

          <div className={styles.residencesCount}>
            <p>{filteredResidences.length} Résidences trouvées</p>
          </div>

          {renderActiveFilters()}
        </div>

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
