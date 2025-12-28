"use client";

import React from 'react';
import Link from 'next/link';
import style from './RecipeCard.module.css';

export default function RecipeCard({ recipe }) {

  const formatTime = (minutes) => {
    if (!minutes && minutes !== 0) return "N/A";
    return `${minutes}min`;
  };

  return (
    <Link 
      href={`/recette/${recipe.slug || recipe.id}`}
      className={style.recipeCardLink}
    >
      <article className={style.recipeCard}>
        <div className={style.imageContainer}>
          <div className={style.imageWrapper}>
            <img
              src={"/images/recipes/" + recipe.image}
              alt={recipe.name || 'Recette sans nom'}
              className={style.image}
            />
          </div>
          <span className={style.timeBadge}>
            {formatTime(recipe.time)}
          </span>
        </div>
        <div className={style.content}>
          <h3 className={style.title}>{recipe.name}</h3>
          <div className={style.descriptionContainer}>
            <h4 className={style.recipeTitle}>
              RECETTE
            </h4>
            <p className={style.recipeDescription}>
              {recipe.description}
            </p>
          </div>
          <div className={style.ingredientsSection}>
            <h4 className={style.ingredientsTitle}>
              INGRÉDIENTS
            </h4>
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              <ul className={style.ingredientsList}>
                {recipe.ingredients.slice(0, 6).map((ingredient, index) => (
                  <li key={index} className={style.ingredientItem}>
                    <div className={style.ingredientContent}>
                      <span className={style.ingredientName}>
                        {ingredient.ingredient}
                      </span>
                      {(ingredient.quantity || ingredient.quantity === 0) && (
                        <span className={style.ingredientQuantity}>
                          {ingredient.quantity} {ingredient.unit || ''}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )
              : (<p className={style.noIngredients}>
                Aucun ingrédient disponible.  
              </p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}