import { useEffect, useState } from 'react';
import type { Recipe } from '../interfaces/Recipe';
import { FilterPanel } from '../components/FilterPanel';
import { RecipeCard } from '../components/RecipeCard';

interface HomeProps {
  recipes: Recipe[];
}

export const Home = ({ recipes }: HomeProps) => {
  const [filtered, setFiltered] = useState<Recipe[]>(recipes);

  useEffect(() => {
    setFiltered(recipes);
  }, [recipes]);

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
