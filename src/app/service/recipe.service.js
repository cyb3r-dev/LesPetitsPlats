import recipesData from 'public/data/recipes.json';

export function findRecipe(slug) {

  return recipesData.find(r => r.slug === slug || r.id.toString() === slug);
}