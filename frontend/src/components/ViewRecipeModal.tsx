import type { Recipe } from '../interfaces/Recipe';
import './ViewRecipeModal.scss';

interface Props {
  recipe: Recipe;
  onClose: () => void;
}

const ViewRecipeModal = ({ recipe, onClose }: Props) => {
  return (
    <div className="modal">
      <button className="close-button" onClick={onClose}>×</button>
      <div className="header">
        <img src={recipe.image || 'https://via.placeholder.com/150'} alt={recipe.title} />
        <div className="title-and-info">
          <h2>{recipe.title}</h2>
          <div className="cuisine-category">
            Кухня: {recipe.cuisine} · {recipe.category}
          </div>
        </div>
      </div>
      <div className="content">
        <div className="ingredients">
          <div className="section-title">Ингредиенты:</div>
          {recipe.ingredients.map((ing, i) => (
            <p key={i}>{ing}</p>
          ))}
        </div>
        <div className="description">
          <div className="section-title">Рецепт:</div>
          <p>{recipe.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewRecipeModal;

