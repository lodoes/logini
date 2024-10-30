import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Pagination from '../components/Pagination';
import ResidenceCard from '../components/ResidenceCard';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar'; // Import the Navbar component
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

  useEffect(() => {
    const fetchResidences = async () => {
      const { data, error } = await supabase.from('residences').select('*');

      if (error) {
        console.error('Erreur lors de la récupération des résidences:', error);
      } else {
        setResidences(data);
        setFilteredResidences(data);
      }
    };

    fetchResidences();
  }, []);

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

  const handleFilterDepartement = (e) => {
    setDepartement(e.target.value);
  };

  const handleFilterDisponibilite = (e) => {
    setDisponibilite(e.target.value);
  };

  const handleFilterPrix = (value) => {
    setPrixMax(value);
  };

  const indexOfLastResidence = currentPage * resultsPerPage;
  const indexOfFirstResidence = indexOfLastResidence - resultsPerPage;
  const currentResidences = filteredResidences.slice(indexOfFirstResidence, indexOfLastResidence);

  const openModal = (residence) => {
    setSelectedResidence(residence);
  };

  const closeModal = () => {
    setSelectedResidence(null);
  };

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <Navbar />

      {/* Filters Row */}
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
            onChange={handleFilterDepartement}
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
            onChange={handleFilterDisponibilite}
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
            onChange={(e) => handleFilterPrix(e.target.value)}
            className={styles.slider}
          />
        </div>
      </div>

      <div className={styles.cardGrid}>
        {currentResidences.length > 0 ? (
          currentResidences.map((residence) => (
            <div key={residence.id} onClick={() => openModal(residence)}>
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

      <Modal show={!!selectedResidence} handleClose={closeModal} residence={selectedResidence} />
    </div>
  );
};

export default Residences;
