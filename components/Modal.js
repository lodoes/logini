import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMapMarkerAlt, faEnvelope, faPhone, faBuilding } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Modal.module.css';

// Dynamically import MapContainer with no SSR


const Modal = ({ show, handleClose, residence }) => {
  if (!show) {
    return null; // Do not render the modal if it's not visible
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Title */}
        <h2 className={styles.modalTitle}>{residence.nom}</h2>

        {/* Modal Body */}
        <div className={styles.modalBody}>
          {/* Left Side: Details */}
          <div className={styles.detailsSection}>
            <p><FontAwesomeIcon icon={faBuilding} className={styles.icon} /> <span>{residence.type}</span></p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} /> <span>{residence.adresse_complete}</span></p>
            <p><span>Ville:</span> {residence.ville}, {residence.departement}</p>
            <p><span>Prix:</span> {residence.prix}€</p>
            <p><span>Disponibilité:</span> {residence.disponibilite}</p>
            <p><FontAwesomeIcon icon={faEnvelope} className={styles.icon} /> <span>{residence.email}</span></p>
            <p><FontAwesomeIcon icon={faPhone} className={styles.icon} /> <span>{residence.telephone}</span></p>
          </div>

          {/* Right Side: Map */}
          
        </div>
      </div>
    </div>
  );
};

export default Modal;
