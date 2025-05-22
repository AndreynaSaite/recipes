import { useState } from 'react';
import { createRecipe } from '../api/recipes';
import type { Recipe } from '../interfaces/Recipe';

interface Props {
  onClose: () => void;
  onRecipeAdded?: (recipe: Recipe) => void;
}

const RecipeModal = ({ onClose, onRecipeAdded }: Props) => {
  const [form, setForm] = useState({
    title: '',
    category: '',
    cuisine: '',
    ingredients: [] as string[],
    description: '',
    image: '',
    Recipet: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newRecipe: Recipe = {
      title: form.title,
      category: form.category,
      cuisine: form.cuisine,
      ingredients: form.ingredients.map(i => i.trim()),
      description: form.description,
      image: form.image,
      Recipet: form.Recipet,
    };

    try {
      await createRecipe(newRecipe);
      onRecipeAdded?.(newRecipe);
      onClose();
    } catch (error) {
      console.error('Ошибка при создании рецепта:', error);
    }
  };

  return (
    <div className="modal">
      <input
        placeholder="Название"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Описание"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />
      <input
        placeholder="Ссылка на изображение"
        value={form.image}
        onChange={e => setForm({ ...form, image: e.target.value })}
      />
      <input
        placeholder="Категория (например, Завтрак)"
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
      />
      <input
        placeholder="Кухня (например, Итальянская)"
        value={form.cuisine}
        onChange={e => setForm({ ...form, cuisine: e.target.value })}
      />
      <input
        placeholder="Ингредиенты (через запятую)"
        value={form.ingredients.join(', ')}
        onChange={e =>
          setForm({ ...form, ingredients: e.target.value.split(',') })
        }
      />
      <textarea
        placeholder="Рецепт"
        value={form.Recipet}
        onChange={e => setForm({ ...form, Recipet: e.target.value })}
      />
      <button onClick={handleSubmit}>Добавить</button>
      <button onClick={onClose}>Отмена</button>
    </div>
  );
};

export default RecipeModal;
