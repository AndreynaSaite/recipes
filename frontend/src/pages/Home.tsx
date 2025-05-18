import { useEffect, useState } from 'react';
import { fetchRecipes } from '../api/recipes';
import type { Recipe } from '../interfaces/Recipe';
import { FilterPanel } from '../components/FilterPanel';
import { RecipeCard } from '../components/RecipeCard';

export const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filtered, setFiltered] = useState<Recipe[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
      setFiltered(data);
    };
    load();
  }, []);

  return (
    <div className="home-page">
      <FilterPanel recipes={recipes} setFilteredRecipes={setFiltered} />
      <div className="recipes">
        {filtered.map(recipe => (
          <RecipeCard key={recipe.title} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};
