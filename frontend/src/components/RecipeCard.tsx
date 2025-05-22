import type { Recipe } from '../interfaces/Recipe';
import './RecipeCard.scss';

interface Props {
  recipe: Recipe;
  onClick?: () => void;
}

export const RecipeCard = ({ recipe, onClick }: Props) => (
  <div className="card" onClick={onClick}>
    <img src={recipe.image || 'https://via.placeholder.com/200'} alt={recipe.title} />
    <h3>{recipe.title}</h3>
    <p>{recipe.description}</p>
    <span className="tags">{recipe.category} · {recipe.cuisine}</span>
  </div>
);
