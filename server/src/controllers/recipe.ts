import { Neo4jDB } from "../db";
import { Request, Response } from "express";
import { isArray } from 'lodash';

export async function getRecipe(req: Request, res: Response) {
  console.log(`Handling get recipe: ${req.params.key}`);

  let db = Neo4jDB.getInstance()!;
  let recipe: any = await db.getRecipe(req.params.key);

  res.send(recipe[0]._fields[0].properties);
}

export async function getRecipesByTags(req: Request, res: Response) {
  let tag = isArray(req.query.tag) ? req.query.tag : [ req.query.tag ];
  console.log(`Handling get recipe by tags: ${tag}`);

  let db = Neo4jDB.getInstance()!;

  let recipes: any = await db.getRecipesFromTags(tag);

  recipes = recipes.reduce((acc: any, cur: any) => {
    return [ ...acc, cur._fields[0].properties ];
  }, []);
  
  res.send(JSON.stringify(recipes, null, 2));
}

// export async function getRecipes(req: Request, res: Response) {
//   let db = Neo4jDB.getInstance()!;
//   let recipe: any = await db.getRecipe(req.params.key);

//   res.send(recipe[0]._fields[0].properties);
// }
