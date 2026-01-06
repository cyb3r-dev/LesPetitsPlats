"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './FiltersSection.module.css';

const FiltersSection = ({
  recipesData,
  availableFilterOptions,
  onFilterChange,
  currentFilters
}) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchTerms, setSearchTerms] = useState({
    ingredients: '',
    appareils: '',
    ustensiles: ''
  });
  const [selectedFilters, setSelectedFilters] = useState(currentFilters || {
    ingredients: [],
    appareils: [],
    ustensiles: []
  });

  const dropdownRef = useRef(null);
  const totalRecipes = recipesData ? recipesData.length : 0;

  useEffect(() => {
    if (currentFilters) {
      setSelectedFilters(currentFilters);
    }
  }, [currentFilters]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveFilter(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFilter = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  const handleSearchChange = (filterName, value) => {
    setSearchTerms(prev => ({
      ...prev,
      [filterName]: value.toLowerCase()
    }));
  };

  const handleSelectItem = (filterName, item) => {
    const newFilters = { ...selectedFilters };
    const filterArray = [...newFilters[filterName]];

    const index = filterArray.findIndex(filterItem =>
      filterItem.toLowerCase() === item.toLowerCase()
    );

    if (index > -1) {

      filterArray.splice(index, 1);
    } else {

      filterArray.push(item);
    }

    newFilters[filterName] = filterArray;

    setSelectedFilters(newFilters);

    setSearchTerms(prev => ({
      ...prev,
      [filterName]: ''
    }));

    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const removeFilter = (filterName, item) => {
    const newFilters = { ...selectedFilters };
    const filterArray = [...newFilters[filterName]];

    const index = filterArray.findIndex(filterItem =>
      filterItem.toLowerCase() === item.toLowerCase()
    );

    if (index > -1) {
      filterArray.splice(index, 1);
    }

    newFilters[filterName] = filterArray;

    setSelectedFilters(newFilters);

    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearAllFilters = () => {
    const newFilters = {
      ingredients: [],
      appareils: [],
      ustensiles: []
    };

    setSelectedFilters(newFilters);

    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const filteredItems = (filterName) => {
    const searchTerm = searchTerms[filterName];
    const items = availableFilterOptions[filterName] || [];

    if (!searchTerm) return items;

    return items.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const isItemSelected = (filterName, item) => {
    return selectedFilters[filterName]?.some(filterItem =>
      filterItem.toLowerCase() === item.toLowerCase()
    );
  };

  const totalSelectedFilters = Object.values(selectedFilters).reduce(
    (total, filters) => total + filters.length, 0
  );

  const filterConfigs = [
    {
      name: 'ingredients',
      label: 'Ingrédients'
    },
    {
      name: 'appareils',
      label: 'Appareils'
    },
    {
      name: 'ustensiles',
      label: 'Ustensiles'
    }
  ];

  return (
    <section className={styles.filtersSection} ref={dropdownRef}>
      <div className={styles.filtersAndCounter}>
        <div className={styles.filtersContainer}>
          {filterConfigs.map(({ name, label, placeholder }) => (
            <div key={name} className={styles.filter}>
              <button
                className={`${styles.filterBtn} ${activeFilter === name ? styles.active : ''}`}
                onClick={() => toggleFilter(name)}
              >
                {label}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`${styles.icon} ${activeFilter === name ? styles.rotate : ''}`}
                />
              </button>

              {activeFilter === name && (
                <div className={styles.dropdownContent}>
                  <div className={styles.dropdownSearchContainer}>
                    <FontAwesomeIcon icon={faSearch} className={styles.dropdownSearchIcon} />
                    <input
                      type="text"
                      placeholder={placeholder}
                      className={styles.dropdownSearchInput}
                      value={searchTerms[name]}
                      onChange={(e) => handleSearchChange(name, e.target.value)}
                      autoFocus
                    />
                  </div>

                  <div className={styles.itemsList}>
                    {filteredItems(name).length > 0 ? (
                      filteredItems(name).map((item, index) => (
                        <div
                          key={`${name}-${index}`}
                          className={`${styles.dropdownItem} ${isItemSelected(name, item) ? styles.selected : ''
                            }`}
                          onClick={() => handleSelectItem(name, item)}
                        >
                          {capitalizeFirstLetter(item)}
                          {isItemSelected(name, item) && (
                            <FontAwesomeIcon icon={faTimes} className={styles.itemRemoveIcon} />
                          )}
                        </div>
                      ))
                    ) : (
                      <div className={styles.noResults}>
                        Aucun résultat trouvé
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.recipeCounter}>
          <span>{totalRecipes} recettes</span>
        </div>
      </div>
      {totalSelectedFilters > 0 && (
        <div className={styles.selectedFiltersSection}>
          <div className={styles.selectedFiltersContainer}>
            {selectedFilters.ingredients.map((item, index) => (
              <div key={`ingredient-${index}`} className={styles.selectedFilterTag}>
                <span className={styles.selectedFilterText}>
                  {capitalizeFirstLetter(item)}
                </span>
                <button
                  className={styles.selectedFilterRemoveBtn}
                  onClick={() => removeFilter('ingredients', item)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))}
            {selectedFilters.appareils.map((item, index) => (
              <div key={`appareil-${index}`} className={styles.selectedFilterTag}>
                <span className={styles.selectedFilterText}>
                  {capitalizeFirstLetter(item)}
                </span>
                <button
                  className={styles.selectedFilterRemoveBtn}
                  onClick={() => removeFilter('appareils', item)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))}
            {selectedFilters.ustensiles.map((item, index) => (
              <div key={`ustensile-${index}`} className={styles.selectedFilterTag}>
                <span className={styles.selectedFilterText}>
                  {capitalizeFirstLetter(item)}
                </span>
                <button
                  className={styles.selectedFilterRemoveBtn}
                  onClick={() => removeFilter('ustensiles', item)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))}
            <button
              className={styles.clearAllFiltersBtn}
              onClick={clearAllFilters}
            >
              Effacer tous les filtres
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FiltersSection;