import React from 'react';
import styles from '../styles/Modal.module.css';

const Modal = ({ show, handleClose, residence }) => {
  if (!show) {
    return null; // Do not render the modal if it's not visible
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={handleClose}>X</button>
        <h2>{residence.nom}</h2>
        <p><strong>Type:</strong> {residence.type}</p>
        <p><strong>Adresse complète:</strong> {residence.adresse_complete}</p>
        <p><strong>Ville:</strong> {residence.ville}</p>
        <p><strong>Département:</strong> {residence.departement}</p>
        <p><strong>Disponibilité:</strong> {residence.disponibilite}</p>
        <p><strong>Prix:</strong> {residence.prix}€</p>
        <p><strong>Email:</strong> {residence.email}</p>
        <p><strong>Téléphone:</strong> {residence.telephone}</p>
        <p><strong>Coordonnées GPS:</strong> {residence.latitude}, {residence.longitude}</p>
      </div>
    </div>
  );
};

export default Modal;
