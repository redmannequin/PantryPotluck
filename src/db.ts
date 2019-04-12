import { v1 as neo4j } from "neo4j-driver";


const uri = "bolt://localhost:7687"
const user = "app"
const password = "test"

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

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

export const addIngredient = (tx: any, ingredient: Ingredient) => {
    return tx.run(
        'CREATE (a:Ingredient {name: $name})', 
        ingredient
    );
}

export const addRecipe = (tx: any, recipe: Recipe) => {
    return tx.run(
        'CREATE (a:Recipe {name: $name, directions: $directions})', 
        recipe
    );
}

export const addIngredient2Recipe = (tx: any, ingredient: Ingredient, recipe: Recipe) => {
    return tx.run(
        'MATCH (a:Recipe {name: $recipe}) ' + 
        'MATCH (b:Ingredient {name: $ingredient}) ' +
        'MERGE (a)-[:KNOWS]->(b)', 
        {
            'recipe': recipe.name, 
            'ingredient': ingredient.name
        }
    );
}

export const addIngredients = (ingredients: Ingredient[]) => {
    const session = driver.session();
    let writeTxPromise = session.writeTransaction(tx => addIngredient(tx, ingredients.shift()));
    ingredients.forEach( ingredient => {
        writeTxPromise = writeTxPromise.then( () => session.writeTransaction(tx => addIngredient(tx, ingredient)))
    })
    writeTxPromise.then(() => {return session.close();})
}

export const addRecipes = (recipes: Recipe[]) => {
    const session = driver.session();
    let writeTxPromise = session.writeTransaction(tx => addRecipe(tx, recipes.shift()));
    recipes.forEach( recipe => {
        writeTxPromise = writeTxPromise.then( () => session.writeTransaction(tx => addRecipe(tx, recipe)))
    })
    writeTxPromise.then(() => {return session.close();})
}

export const addRecipeRelationships = (recipe: FullRecipe) => {
    const session = driver.session();
    const ingredients = [...recipe.ingredients];
    let writeTxPromise = session.writeTransaction(tx => addIngredient2Recipe(tx, ingredients.shift(), recipe));
    ingredients.forEach( ingredient => {
        writeTxPromise = writeTxPromise.then( () => session.writeTransaction(tx => addIngredient2Recipe(tx, ingredient, recipe)))
    })
    writeTxPromise.then(() => {return session.close();})
}




