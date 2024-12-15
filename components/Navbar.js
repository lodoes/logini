// components/Navbar.js
import React from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* Left Side: Logo */}
      <div className={styles.logo}>
        <Link href="/">
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <ul className={styles.navLinks}>
        <li>
          <Link href="/" className={styles.activeLink}>
            Accueil
          </Link>
        </li>
        <li><Link href="/residences">Toutes les résidences</Link></li>
        <li><Link href="/maps">Carte des Résidences</Link></li>
       
      </ul>

      {/* Right Side: Icons */}
      <div className={styles.icons}>
        <p></p>
      </div>
    </nav>
  );
};

export default Navbar;
