export interface Recipe {
  id?: number;
  title: string;
  description: string;
  image?: string;
  category?: string;
  cuisine?: string;
  ingredients: string[];
}
