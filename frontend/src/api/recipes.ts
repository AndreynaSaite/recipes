import axios from 'axios';
import type { Recipe } from '../interfaces/Recipe';



const API_BASE = 'http://localhost:3001';

export const fetchRecipes = async (): Promise<Recipe[]> => {
  const res = await axios.get(`${API_BASE}/recipes`);
  return res.data;
};

export const createRecipe = async (recipe: Recipe): Promise<Recipe> => {
  const res = await axios.post(`${API_BASE}/recipes`, recipe);
  return res.data;
};
