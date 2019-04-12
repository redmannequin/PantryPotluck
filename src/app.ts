import { getAllRecipes } from './utils/parse';

async function test() {
    let allRecipes = await getAllRecipes();
    console.log(allRecipes.length);
}

test();


// const recipes: Recipe[] = [];
// for(let i=0; i< 6; ++i) {
//     recipes.push({
//         name: 'r'+i,
//         directions: ''
//     })
// }


// const ingredients: Ingredient[] = [];
// for(let i=0; i< 10; ++i) {
//     ingredients.push({
//         name: 'i'+i,
//     })
// }

// const fullRecipes: FullRecipe[] = recipes.map( elm => {
//     const ins = []
//     for(let i=0; i< 3; ++i) {
//         ins.push(ingredients[Math.floor(Math.random() * ingredients.length)])
//     }
//     return {
//         ...elm,
//         ingredients: ins
//     }
// });

// addRecipes(recipes);
// addIngredients(ingredients)
// fullRecipes.forEach(recipe => addRecipeRelationships(recipe))