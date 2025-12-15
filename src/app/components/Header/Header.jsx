import React from 'react';
import styles from './Header.module.css';


const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <img
          src="/images/banner.png"
          alt="Les Petits Plats Banner"
          className={styles.bannerImage}
        />
        <img
          src="/images/logo.png"
          alt="Les Petits Plats Logo"
          className={styles.logo}
        />
        <p className={styles.tagline}>
          DÉCOUVREZ NOS RECETTES <br />
          DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES
        </p>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Rechercher une recette, un ingrédient, ..."
          />
          <button className={styles.searchButton}>
            <img src="/images/Loupe.svg" alt="Search" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;