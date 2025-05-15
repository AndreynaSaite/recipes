import './FilterPanel.scss';

export const FilterPanel = () => (
  <div className="filters">
    <select><option>Любая категория</option></select>
    <select><option>Любое блюдо</option></select>
    <select><option>Любая кухня</option></select>
    <input type="text" placeholder="Ингредиенты, детали..." />
    <button>Подобрать рецепты</button>
  </div>
);
