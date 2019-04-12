export interface IRecipe {
    title: string;
    titleKey?: string;
    directions: string[];
    ingredientsDetailed: string[];
    tags?: string[];
    categories: string[];
    calories: number;
    protein: number;
    fat: number;
    sodium: number;
    rating: number;
    date: Date;
  }
  