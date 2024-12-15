import React from 'react';
import styles from '../styles/ResidenceCardmini.module.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

const ResidenceCard = ({ residence }) => {
  // Fonction pour déterminer la couleur du statut
  const getStatusClass = (disponibilite) => {
    switch (disponibilite.toLowerCase()) {
      case 'disponible':
        return styles.available;
      case 'bientôt disponible':
        return styles.soon;
      case 'non disponible':
        return styles.unavailable;
      default:
        return styles.notProvided;
    }
  };

  return (
    <div className={styles.card}>
      {/* Statut */}
      <div className={`${styles.statusBadge} ${getStatusClass(residence.disponibilite)}`}>
        {residence.disponibilite || 'Non renseigné'}
      </div>

      {/* Nom et localisation */}
      <div className={styles.details}>
        <h3 className={styles.cardTitle}>{residence.nom}</h3>
        <span className={styles.location}>
          <FaMapMarkerAlt /> {residence.ville}, {residence.departement}
        </span>
      </div>

      {/* Séparateur */}
      <div className={styles.separator}></div>

      {/* Prix et Voir */}
      <div className={styles.footer}>
        <span className={styles.cardPrice}>{residence.prix}€</span>
        <a 
  href={residence.lien || '#'} 
  className={styles.viewLink} 
  target="_blank" 
  rel="noopener noreferrer"
>
          Voir
        </a>
      </div>
    </div>
  );
};

export default ResidenceCard;
