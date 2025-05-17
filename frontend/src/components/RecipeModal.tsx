import { useState } from 'react';
import { createRecipe } from '../api/recipes';
import type { Recipe } from '../interfaces/Recipe';

import './RecipeModal.scss';

export const RecipeModal = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState<Recipe>({
    title: '',
    description: '',
    ingredients: [],
    image: '',
    category: '',
    cuisine: '',
  });

  const handleSubmit = async () => {
    // Очистка от лишних пробелов
    const trimmedIngredients = form.ingredients.map(i => i.trim()).filter(i => i.length > 0);
    await createRecipe({ ...form, ingredients: trimmedIngredients });
    onClose();
    window.location.reload();
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
        onChange={e =>
          setForm({ ...form, ingredients: e.target.value.split(',') })
        }
      />
      <button onClick={handleSubmit}>Добавить</button>
      <button onClick={onClose}>Отмена</button>
    </div>
  );
};
