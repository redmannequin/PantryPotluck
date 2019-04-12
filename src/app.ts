import { getAllRecipes } from 'src/utils/parse';

async function test() {
    let allRecipes = await getAllRecipes();
    console.log(allRecipes.length);
}

test();
