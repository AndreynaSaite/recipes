import type { Recipe } from '../interfaces/Recipe';
import './RecipeCard.scss';

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <div className="card">
    <img src={recipe.image || 'https://via.placeholder.com/200'} alt={recipe.title} />
    <h3>{recipe.title}</h3>
    <p>{recipe.description}</p>
    <span className="tags">{recipe.category} · {recipe.cuisine}</span>
  </div>
);
