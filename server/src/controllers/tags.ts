import { Neo4jDB } from "../db";
import { v1 as neo4j } from "neo4j-driver";
import { Request, Response } from "express";
import { IRecipeTag } from "src/types";

export async function getTags(_: Request, res: Response) {
  let db = Neo4jDB.getInstance()!;
  let tags: any = await db.getTags();

  tags = tags.reduce((acc: IRecipeTag[], current: neo4j.Record) => {
    return [...acc, current.get("i.name")];
  }, []);

  res.send(tags);
}
