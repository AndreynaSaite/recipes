import { useState } from 'react';
import { createRecipe } from '../api/recipes';
import type { Recipe } from '../interfaces/Recipe';

import './RecipeModal.scss';

export const RecipeModal = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState<Recipe>({
    title: '',
    description: '',
    ingredients: [],
  });

  const handleSubmit = async () => {
    await createRecipe(form);
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
        placeholder="Ингредиенты (через запятую)"
        onChange={e => setForm({ ...form, ingredients: e.target.value.split(',') })}
      />
      <button onClick={handleSubmit}>Добавить</button>
      <button onClick={onClose}>Отмена</button>
    </div>
  );
};
