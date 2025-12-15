"use client";

import React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './RecipeGrid.module.css';

import recipesData from '../../../../public/data/recipes.json';

function RecipeGrid() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {recipesData.map((recipe) => (
          <div key={recipe.id} className={styles.gridItem}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeGrid;