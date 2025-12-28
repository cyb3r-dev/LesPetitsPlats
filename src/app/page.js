import React from 'react';
import Header from './components/Header/LargeHeader';
import Footer from './components/Footer/Footer';
import FilterSection from './components/FiltersSection/FiltersSection';
import RecipeGrid from './components/RecipeGrid/RecipeGrid';
import style from './page.module.css';

export default function App() {
  return (
    <div className="main-container">
      <Header />
      <main className={style.main}>
        <FilterSection />
        <RecipeGrid />
      </main>
      <Footer />
    </div>
  );
}