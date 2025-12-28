import { findRecipe } from '@/app/service/recipe.service';
import { notFound } from 'next/navigation';
import style from './recipePage.module.css';
import Footer from '@/app/components/Footer/Footer';
import SmallHeader from '@/app/components/Header/SmallHeader';

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = findRecipe(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <>
      <SmallHeader />
      <div className={style.container}>
        <div className={style.imageContainer}>
          {recipe.image && (
            <img
              className={style.image}
              src={`/images/recipes/${recipe.image}`}
              alt={recipe.name}
            />
          )}
        </div>
        <div className={style.contentWrapper}>
          <h1 className={style.title}>{recipe.name}</h1>
          <div className={style.preparationSection}>
            <h2 className={style.subtitle}>TEMPS DE PRÉPARATION</h2>
            {recipe.time && <p className={style.time}>{recipe.time}min</p>}
          </div>
          <div className={style.ingredientsSection}>
            <h2 className={style.subtitle}>INGRÉDIENTS</h2>
            <ul className={style.ingredients}>
              {recipe.ingredients?.map((ing, i) => (
                <li key={i} className={style.ingredient}>
                  <span className={style.ingredientName}>{ing.ingredient}</span>
                  <span className={style.ingredientQuantity}>
                    {ing.quantity} {ing.unit && ing.unit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.ustensilesSection}>
            <h2 className={style.subtitle}>USTENSILES NÉCESSAIRES</h2>
            {recipe.ustensils && recipe.ustensils.length > 0 && (
              <ul className={style.ustensilesList}>
                {recipe.ustensils.map((ustensil, i) => (
                  <li key={i} className={style.ustensil}>{ustensil}</li>
                ))}
              </ul>
            )}
          </div>
          <div className={style.appareilsSection}>
            <h2 className={style.subtitle}>APPAREILS NÉCESSAIRES</h2>
            {recipe.appliance && (
              <p className={style.appareil}>{recipe.appliance}</p>
            )}
          </div>
          <div className={style.recetteSection}>
            <h2 className={style.subtitle}>RECETTE</h2>
            {recipe.description && (
              <div className={style.descriptionContainer}>
                <p className={style.description}>{recipe.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}