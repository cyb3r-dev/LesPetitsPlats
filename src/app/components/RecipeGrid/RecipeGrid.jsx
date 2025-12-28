"use client";

import React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import style from './RecipeGrid.module.css';
import recipesData from 'public/data/recipes.json';

export default function RecipeGrid() {
  return (
    <div className={style.container}>
      <div className={style.grid}>
        {recipesData.map((recipe) => (
          <div key={recipe.id} className={style.gridItem}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}