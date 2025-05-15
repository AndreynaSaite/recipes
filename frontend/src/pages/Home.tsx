import { useEffect, useState } from 'react';
import { fetchRecipes } from '../api/recipes';
import type { Recipe } from '../interfaces/Recipe';
import { RecipeCard } from '../components/RecipeCard';
import { FilterPanel } from '../components/FilterPanel';

export const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchRecipes().then(setRecipes);
  }, []);

  return (
    <main>
      <FilterPanel />
      <div className="recipes">
        {recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
      </div>
    </main>
  );
};
