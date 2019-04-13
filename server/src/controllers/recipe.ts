import { Neo4jDB } from "../db";
import { Request, Response } from "express";

export async function getRecipe(req: Request, res: Response) {
  let db = Neo4jDB.getInstance()!;
  let recipe: any = await db.getRecipe(req.params.key);

  res.send(recipe[0]._fields[0].properties);
}
