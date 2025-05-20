import type { Recipe } from '../interfaces/Recipe';
import './RecipeCard.scss';

interface Props {
  recipe: Recipe;
  onClick?: () => void;
}

export const RecipeCard = ({ recipe, onClick }: Props) => (
  <div className="card" onClick={onClick}>
    <img src={recipe.image || 'https://via.placeholder.com/200'} alt={recipe.title} />
    <div>
      <h1 className="titleh1">{recipe.title}</h1>
      <p className="desc"><strong>Рецепт:</strong> {recipe.description}</p>
      <span className="tags">{recipe.category} · {recipe.cuisine}</span>
    </div>
  </div>
);
