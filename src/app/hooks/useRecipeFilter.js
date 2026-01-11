"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import recipesData from 'public/data/recipes.json';

export const useRecipeFilter = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState({
        ingredients: [],
        appareils: [],
        ustensiles: []
    });
    const [filteredRecipes, setFilteredRecipes] = useState(recipesData);

    const normalize = useCallback((str) => {
        return str?.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || '';
    }, []);

    const recipeMatchesSearch = useCallback((recipe, term) => {
        const search = normalize(term);

        return normalize(recipe.name).includes(search) ||
            normalize(recipe.description).includes(search) ||
            recipe.ingredients?.some(ing => normalize(ing.ingredient).includes(search));
    }, [normalize]);

    const applyTagFilters = useCallback((recipes, filters) => {
        return recipes.filter(recipe => {
            const hasIngredients = !filters.ingredients.length || filters.ingredients.every(filter =>
                recipe.ingredients?.some(ing => normalize(ing.ingredient) === normalize(filter))
            );

            const hasAppareils = !filters.appareils.length || filters.appareils.some(filter =>
                normalize(recipe.appliance) === normalize(filter)
            );

            const hasUstensiles = !filters.ustensiles.length || filters.ustensiles.every(filter =>
                recipe.ustensils?.some(ust => normalize(ust) === normalize(filter))
            );

            return hasIngredients && hasAppareils && hasUstensiles;
        });
    }, [normalize]);

    const availableFilterOptions = useMemo(() => {
        const ingredientsMap = new Map();
        const appareilsMap = new Map();
        const ustensilesMap = new Map();

        filteredRecipes.forEach(recipe => {
            recipe.ingredients?.forEach(({ ingredient }) => {
                if (ingredient) {
                    const key = normalize(ingredient);
                    if (!ingredientsMap.has(key)) ingredientsMap.set(key, ingredient.trim());
                }
            });

            if (recipe.appliance) {
                const key = normalize(recipe.appliance);
                if (!appareilsMap.has(key)) appareilsMap.set(key, recipe.appliance.trim());
            }

            recipe.ustensils?.forEach(ustensile => {
                if (ustensile) {
                    const key = normalize(ustensile);
                    if (!ustensilesMap.has(key)) ustensilesMap.set(key, ustensile.trim());
                }
            });
        });

        return {
            ingredients: Array.from(ingredientsMap.values()).sort(),
            appareils: Array.from(appareilsMap.values()).sort(),
            ustensiles: Array.from(ustensilesMap.values()).sort()
        };
    }, [filteredRecipes, normalize]);

    useEffect(() => {
        let results = recipesData;

        if (searchTerm.trim().length >= 3) {
            results = results.filter(recipe => recipeMatchesSearch(recipe, searchTerm));
        }

        const hasFilters = activeFilters.ingredients.length > 0 ||
            activeFilters.appareils.length > 0 ||
            activeFilters.ustensiles.length > 0;

        if (hasFilters) {
            results = applyTagFilters(results, activeFilters);
        }

        setFilteredRecipes(results);
    }, [searchTerm, activeFilters, recipeMatchesSearch, applyTagFilters]);

    const handleSearch = (term) => {
        setSearchTerm(typeof term === 'string' ? term : '');
    };

    const handleFilterChange = (filters) => {
        const deduplicate = (arr) => {
            const seen = new Set();
            return arr.filter(item => {
                const key = normalize(item);
                return seen.has(key) ? false : (seen.add(key), true);
            });
        };

        setActiveFilters({
            ingredients: deduplicate(filters.ingredients),
            appareils: deduplicate(filters.appareils),
            ustensiles: deduplicate(filters.ustensiles)
        });
    };

    const handleClearSearch = () => setSearchTerm('');

    const handleClearAllFilters = () => {
        setSearchTerm('');
        setActiveFilters({ ingredients: [], appareils: [], ustensiles: [] });
    };

    const addTag = (type, value) => {
        const key = normalize(value);
        setActiveFilters(prev => ({
            ...prev,
            [type]: prev[type].some(item => normalize(item) === key)
                ? prev[type]
                : [...prev[type], value.trim()]
        }));
    };

    const removeTag = (type, value) => {
        const key = normalize(value);
        setActiveFilters(prev => ({
            ...prev,
            [type]: prev[type].filter(item => normalize(item) !== key)
        }));
    };

    const handleAddTagFromSearch = (term) => {
        if (term && term.trim().length >= 3) {
            const key = normalize(term.trim());
            setActiveFilters(prev => ({
                ...prev,
                ingredients: prev.ingredients.some(item => normalize(item) === key)
                    ? prev.ingredients
                    : [...prev.ingredients, term.trim()]
            }));
            setSearchTerm('');
        }
    };

    return {
        searchTerm,
        activeFilters,
        filteredRecipes,
        availableFilterOptions,
        hasActiveSearch: searchTerm.trim().length >= 3,
        noSearchResults: searchTerm.trim().length >= 3 && filteredRecipes.length === 0,
        handleSearch,
        handleFilterChange,
        handleClearSearch,
        handleClearAllFilters,
        handleAddTagFromSearch,
        addTag,
        removeTag,
        allRecipes: recipesData
    };
};