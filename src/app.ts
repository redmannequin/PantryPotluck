import { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } from "./utils/env";
import { getAllRecipes } from "./utils/parse";
import { Neo4jDB } from "./db";

const DATABASE = Neo4jDB.getInstance(
  NEO4J_URI,
  NEO4J_USERNAME,
  NEO4J_PASSWORD,
  true
)!;

populateDatabase();

async function populateDatabase() {
  let start = Date.now();

  let allRecipes = await getAllRecipes();

  console.log(`Unique Recipes: ${allRecipes.length}`);

  for (let r = 0; r < allRecipes.length; r++) {
    await DATABASE.addRecipeAndIngredients(allRecipes[r]);

    if (r % 100 === 0) console.log(r);
  }

  let end = Date.now();
  console.log(`Time taken: ${end - start}`);

  process.exit(0);
}
