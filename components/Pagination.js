import React from 'react';
import styles from '../styles/Residences.module.css';

const Pagination = ({ currentPage, totalResults, resultsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${styles.pageButton} ${styles.navButton}`}
      >
        &lt; Back
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${styles.pageButton} ${page === currentPage ? styles.activePage : ''}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${styles.pageButton} ${styles.navButton}`}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
