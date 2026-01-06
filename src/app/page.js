"use client";

import React from 'react';
import LargeHeader from './components/Header/LargeHeader';
import FiltersSection from './components/FiltersSection/FiltersSection';
import RecipeGrid from './components/RecipeGrid/RecipeGrid';
import Footer from './components/Footer/Footer';
import styles from './page.module.css';
import { useRecipeFilter } from './hooks/useRecipeFilter';

export default function App() {
  const {
    searchTerm,
    activeFilters,
    filteredRecipes,
    availableFilterOptions,
    noSearchResults,
    handleSearch,
    handleFilterChange,
    handleClearSearch,
    handleClearAllFilters
  } = useRecipeFilter();

  return (
    <div className={styles.app}>
      <LargeHeader
        onSearch={handleSearch}
        currentSearch={searchTerm}
        onClearSearch={handleClearSearch}
      />
      <main className={styles.main}>
        <FiltersSection
          recipesData={filteredRecipes}
          availableFilterOptions={availableFilterOptions}
          onFilterChange={handleFilterChange}
          currentFilters={activeFilters}
          currentSearch={searchTerm}
          onClearAllFilters={handleClearAllFilters}
        />
        {noSearchResults ? (
          <div className={styles.noResultsMessage}>
            Aucune recette ne contient '<strong>{searchTerm.trim()}</strong>'<br />
          </div>
        ) : null}
        <RecipeGrid recipes={filteredRecipes} />
      </main>
      <Footer />
    </div>
  );
}