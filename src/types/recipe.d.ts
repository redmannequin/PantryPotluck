export interface IRecipe {
    title: string;
    titleKey?: string;
    directions: string[];
    ingredientsDetailed: string[];
    tags?: IRecipeTag[];
    categories: string[];
    calories: number;
    protein: number;
    fat: number;
    sodium: number;
    rating: number;
    date: Date;
  }

export interface IRecipeTag {
  name: string;
}
