import { useEffect, useState } from 'react';
import type { Recipe } from '../interfaces/Recipe';
import { FilterPanel } from '../components/FilterPanel';
import { RecipeCard } from '../components/RecipeCard';
import ViewRecipeModal from '../components/ViewRecipeModal'; // добавим просмотрочный модал

interface HomeProps {
  recipes: Recipe[];
}

export const Home = ({ recipes }: HomeProps) => {
  const [filtered, setFiltered] = useState<Recipe[]>(recipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    setFiltered(recipes);
  }, [recipes]);

  return (
    <div className="home-page">
      <FilterPanel recipes={recipes} setFilteredRecipes={setFiltered} />
      <div className="recipes">
        {filtered.map(recipe => (
          <RecipeCard
            key={recipe.title}
            recipe={recipe}
            onClick={() => setSelectedRecipe(recipe)}
          />
        ))}
      </div>

      {selectedRecipe && (
        <ViewRecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
};
