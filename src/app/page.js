import React from 'react';
import Header from './components/Header/Header';
import FilterSection from './components/FilterSection/FiltersSection';
import RecipeGrid from './components/RecipeGrid/RecipeGrid';
import Footer from './components/Footer/Footer';
import styles from './page.module.css';


function App() {
  return (
    <div className="app">
      <Header />
      <main className={styles.main}>
        <FilterSection />
        <RecipeGrid />
      </main>
    </div>
  );
}

export default App;