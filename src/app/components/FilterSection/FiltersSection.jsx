import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styles from './FiltersSection.module.css';
import recipesData from '../../../../public/data/recipes.json';

const FiltersSection = () => {

  const totalRecipes = recipesData.length;

  return (
    <section className={styles.filtersSection}>
      <div className={styles.filtersContainer}>
        <div className={styles.filter}>
          <button className={styles.filterBtn}>
            Ingrédients
            <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
          </button>
          <div className={styles.dropdownContent}>
          </div>
        </div>
        <div className={styles.filter}>
          <button className={styles.filterBtn}>
            Appareils
            <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
          </button>
          <div className={styles.dropdownContent}>
          </div>
        </div>
        <div className={styles.filter}>
          <button className={styles.filterBtn}>
            Ustensiles
            <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
          </button>
          <div className={styles.dropdownContent}>
          </div>
        </div>
      </div>
      <div className={styles.recipeCounter}>
        <span>{totalRecipes} recettes</span>
      </div>
    </section>
  );
};

export default FiltersSection;