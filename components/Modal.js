import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMapMarkerAlt, faEnvelope, faPhone, faBuilding,faMap,faEuroSign,faCheck} from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Modal.module.css';

const Modal = ({ show, handleClose, residence }) => {
  if (!show) return null;

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
          <div className={styles.detailsSection}>
            <p><FontAwesomeIcon icon={faBuilding} className={styles.icon} /> {residence.type}</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} /> {residence.adresse_complete}</p>
            <p><FontAwesomeIcon icon={faMap} className={styles.icon} /> Département:  {residence.departement}</p>
            <p><FontAwesomeIcon icon={faEuroSign} className={styles.icon} /> Prix: {residence.prix}€</p>
            <p><FontAwesomeIcon icon={faCheck} className={styles.icon} /> Disponibilité: {residence.disponibilite}</p>
            <p><FontAwesomeIcon icon={faEnvelope} className={styles.icon} /> {residence.email}</p>
            <p><FontAwesomeIcon icon={faPhone} className={styles.icon} /> {residence.telephone}</p>
          </div>
        </div>

        {/* Link to view residence */}
        <a href={`${residence.lien}`} className={styles.viewLink}>Voir la résidence</a>
      </div>
    </div>
  );
};

export default Modal;
