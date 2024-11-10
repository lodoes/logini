"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import Pagination from '../components/Pagination';
import ResidenceCard from '../components/ResidenceCard';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import styles from '../styles/Residences.module.css';

const Residences = () => {
  const [residences, setResidences] = useState([]);
  const [filteredResidences, setFilteredResidences] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResidence, setSelectedResidence] = useState(null);
  const resultsPerPage = 20;

  const [searchText, setSearchText] = useState('');
  const [departement, setDepartement] = useState('');
  const [disponibilite, setDisponibilite] = useState('');
  const [prixMax, setPrixMax] = useState(1000);

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

    if (prixMax) {
      filtered = filtered.filter((residence) =>
        parseFloat(residence.prix) <= prixMax
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
  }, [searchText, departement, disponibilite, prixMax]);

  // Rendu du composant
  return (
    <>
      <Navbar />

      <div className={styles.container}>
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
              <option value="disponible">Disponible</option>
              <option value="Bientôt disponible">Bientôt Disponible</option>
              <option value="non disponible">Indisponible</option>
              <option value="non renseigné">Non renseigné</option>
            </select>
          </div>

          <div className={styles.sliderContainer}>
            <label>Prix maximum: {prixMax}€</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={prixMax}
              onChange={(e) => setPrixMax(e.target.value)}
              className={styles.slider}
            />
          </div>
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
