import './FilterPanel.scss';
import { useEffect, useState } from 'react';
import type { Recipe } from '../interfaces/Recipe';

interface Props {
  recipes: Recipe[];
  setFilteredRecipes: (recipes: Recipe[]) => void;
}

export const FilterPanel = ({ recipes, setFilteredRecipes }: Props) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [titles, setTitles] = useState<string[]>([]);

  const [filters, setFilters] = useState({
    category: '',
    cuisine: '',
    title: '',
    search: '',
  });

  useEffect(() => {
    const unique = (arr: (string | undefined)[]) =>
      [...new Set(arr.filter((v): v is string => !!v))];

    setCategories(unique(recipes.map(r => r.category)));
    setCuisines(unique(recipes.map(r => r.cuisine)));
    setTitles(unique(recipes.map(r => r.title)));
  }, [recipes]);

  useEffect(() => {
    const filtered = recipes.filter(recipe => {
      const matchesCategory = !filters.category || recipe.category === filters.category;
      const matchesCuisine = !filters.cuisine || recipe.cuisine === filters.cuisine;
      const matchesTitle = !filters.title || recipe.title === filters.title;

      const search = filters.search.toLowerCase();
      const matchesSearch =
        !search ||
        recipe.title.toLowerCase().includes(search) ||
        recipe.description.toLowerCase().includes(search) ||
        recipe.ingredients.some(i => i.toLowerCase().includes(search));

      return matchesCategory && matchesCuisine && matchesTitle && matchesSearch;
    });

    setFilteredRecipes(filtered);
  }, [filters, recipes, setFilteredRecipes]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filters">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          name="search"
          type="text"
          placeholder="Поиск по рецептам или ингредиентам"
          value={filters.search}
          onChange={handleChange}
        />
      </div>

      <select
        className="marginrt"
        name="category"
        value={filters.category}
        onChange={handleChange}
      >
        <option value="">Категория</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <select
        className="marginrt"
        name="title"
        value={filters.title}
        onChange={handleChange}
      >
        <option value="">Блюдо</option>
        {titles.map(title => (
          <option key={title} value={title}>{title}</option>
        ))}
      </select>

      <select
        className="marginrt"
        name="cuisine"
        value={filters.cuisine}
        onChange={handleChange}
      >
        <option value="">Кухня</option>
        {cuisines.map(cuisine => (
          <option key={cuisine} value={cuisine}>{cuisine}</option>
        ))}
      </select>
    </div>
  );
};
