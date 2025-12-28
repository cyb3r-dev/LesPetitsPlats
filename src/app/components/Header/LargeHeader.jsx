import React from 'react';
import style from './LargeHeader.module.css';

export default function LargeHeader() {
  return (
    <header className={style.header}>
      <img
        src="/images/banner.png"
        alt="Les Petits Plats Banner"
        className={style.bannerImage}
      />
      <img
        src="/images/logo.png"
        alt="Les Petits Plats Logo"
        className={style.logo}
      />
      <p className={style.tagline}>
        DÉCOUVREZ NOS RECETTES <br />
        DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES
      </p>
      <div className={style.searchContainer}>
        <input
          type="text"
          className={style.searchInput}
          placeholder="Rechercher une recette, un ingrédient, ..."
        />
        <button className={style.searchButton}>
          <img src="/images/Loupe.svg" alt="Search" />
        </button>
      </div>
    </header>
  );
}