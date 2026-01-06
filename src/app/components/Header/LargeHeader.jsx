"use client";

import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './LargeHeader.module.css';

const LargeHeader = ({
  onSearch,
  currentSearch = '',
  onClearSearch
}) => {
  const searchInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(currentSearch);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleClearSearch = () => {
    if (onClearSearch) {
      onClearSearch();
    }
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <header className={styles.header}>
      <img
        src="/images/banner.png"
        alt="Les Petits Plats Banner"
        className={styles.banner}
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

      <div className={styles.searchSection}>
        <form onSubmit={handleSubmit} className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Rechercher une recette, un ingrédient ..."
              className={styles.searchInput}
              value={currentSearch || ''}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              minLength="3"
            />
            <div className={styles.searchButtons}>
              {currentSearch && currentSearch.length > 0 && (
                <button
                  type="button"
                  className={styles.clearSearchButton}
                  onClick={handleClearSearch}
                  aria-label="Effacer la recherche"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              )}
              <button
                type="submit"
                className={styles.searchButton}
                aria-label="Rechercher"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </header>
  );
};

export default LargeHeader;