import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import style from './FiltersSection.module.css';
import recipesData from 'public/data/recipes.json';

export default function FiltersSection() {

  const totalRecipes = recipesData.length;

  return (
    <section className={style.filtersSection}>
      <div className={style.filtersContainer}>
        <div className={style.filter}>
          <button className={style.filterBtn}>
            Ingrédients
            <FontAwesomeIcon icon={faChevronDown} className={style.icon} />
          </button>
          <div className={style.dropdownContent}>
          </div>
        </div>
        <div className={style.filter}>
          <button className={style.filterBtn}>
            Appareils
            <FontAwesomeIcon icon={faChevronDown} className={style.icon} />
          </button>
          <div className={style.dropdownContent}>
          </div>
        </div>
        <div className={style.filter}>
          <button className={style.filterBtn}>
            Ustensiles
            <FontAwesomeIcon icon={faChevronDown} className={style.icon} />
          </button>
          <div className={style.dropdownContent}>
          </div>
        </div>
      </div>
      <div className={style.recipeCounter}>
        <span>{totalRecipes} recettes</span>
      </div>
    </section>
  );
}