import React from 'react';
import styles from '../styles/ResidenceCard.module.css';

const ResidenceCard = ({ residence }) => {
  // Function to determine the status color class
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
      {/* Image container with overlay status indicator */}
      <div className={styles.imageContainer}>
        <img
          src="https://www.arpej.fr/app/uploads/2024/09/residence-etudiante-paris-arppej-cipsion-studio-1-1-e1727442144431-1000x1000-c-default.png"
          alt="Residence"
          className={styles.residenceImage}
        />
        {/* Availability Status Indicator */}
        <span className={`${styles.statusBadge} ${getStatusClass(residence.disponibilite)}`}>
          {residence.disponibilite || 'Non renseigné'}
        </span>
      </div>

      {/* Residence Details */}
      <h3 className={styles.cardTitle}>{residence.nom}</h3>
      <div className={styles.cardHeader}>
        <span className={styles.location}>
          <i className="fa fa-map-marker-alt"></i> {residence.ville}, {residence.departement}
        </span>
        <span className={styles.type}>
           {residence.type}
        </span>
      </div>

{/* Line Separator */}
<div className={styles.separator}></div>
      {/* Price */}
      <div className={styles.cardFooter}>
        <span className={styles.startingText}>À partir de</span>
        <span className={styles.cardPrice}>{residence.prix}€</span>
      </div>
    </div>
  );
};

export default ResidenceCard;
