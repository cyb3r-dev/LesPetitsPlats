"use client";

import React from 'react';
import styles from './RecipeCard.module.css';

function RecipeCard({ recipe }) {

  const formatTime = (minutes) => {
    if (!minutes && minutes !== 0) return "N/A";
    return `${minutes}min`;
  };

  return (
    <article className={styles.recipeCard}>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <img
            src={"/images/recipes/" + recipe.image}
            alt={recipe.name || 'Recette sans nom'}
            className={styles.image}
          />
        </div>
        <span className={styles.timeBadge}>
          {formatTime(recipe.time)}
        </span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{recipe.name}</h3>
        <div className={styles.descriptionContainer}>
          <h4 className={styles.recipeTitle}>
            RECETTE
          </h4>
          <p className={styles.recipeDescription}>
            {recipe.description}
          </p>
        </div>
        <div className={styles.ingredientsSection}>
          <h4 className={styles.ingredientsTitle}>
            INGRÉDIENTS
          </h4>
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            <ul className={styles.ingredientsList}>
              {recipe.ingredients.slice(0, 6).map((ingredient, index) => (
                <li key={index} className={styles.ingredientItem}>
                  <div className={styles.ingredientContent}>
                    <span className={styles.ingredientName}>
                      {ingredient.ingredient}
                    </span>
                    {(ingredient.quantity || ingredient.quantity === 0) && (
                      <span className={styles.ingredientQuantity}>
                        {ingredient.quantity} {ingredient.unit || ''}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )
            : (<p className={styles.noIngredients}>
              Aucun ingrédient disponible.  
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;