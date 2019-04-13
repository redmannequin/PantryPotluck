import { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } from "./utils/env";
import { getAllRecipes } from "./utils/parse";
import { Neo4jDB } from "./db";
import express from "express";
import { Request, Response } from "express";
import { getRecipe, getTags } from "./controllers";

const DATABASE = Neo4jDB.getInstance(
  NEO4J_URI,
  NEO4J_USERNAME,
  NEO4J_PASSWORD,
  false
)!;

async function populateDatabase() {
  let start = Date.now();

  let allRecipes = await getAllRecipes();

  console.log(`Populating Database`);
  console.log(`Unique Recipes: ${allRecipes.length}`);

  for (let r = 0; r < 100 /*allRecipes.length*/; r++) {
    await DATABASE.addRecipeAndIngredients(allRecipes[r]);

    if (r % 100 === 0) console.log(r);
  }

  let end = Date.now();
  console.log(`Time taken: ${end - start}`);
}

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  console.log(req);

  res.send("Test");
});

app.get("/populate", async (_, res: Response) => {
  res.send("Starting...");
  await DATABASE.drop();
  await DATABASE.constraints();
  populateDatabase();
});

app.get("/tags", getTags);
app.get("/recipe/:key", getRecipe);

app.listen(port, () => {
  console.log(`
  Server is running at localhost:${port}
  `);
});
