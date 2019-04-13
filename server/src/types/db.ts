interface IIngredient {
    name: string
}

interface IRecipe {
    name: string,
    directions: string
}

interface IRecipeIngredients {
    ingredients: Ingredient[] 
}

export type Ingredient = IIngredient;
export type Recipe = IRecipe;
export type RecipeIngredients = IRecipeIngredients;
export type FullRecipe = Recipe & RecipeIngredients;