import { v1 as neo4j } from "neo4j-driver";
import { IRecipe, IRecipeTag } from "./types";

export class Neo4jDB {
  private static instance: Neo4jDB;
  //   private uri: string;
  //   private username: string;
  //   private password: string;
  private driver: any;

  static getInstance(
    uri?: string,
    username?: string,
    password?: string,
    drop?: boolean
  ) {
    if (!Neo4jDB.instance) {
      if (uri == null || username == null || password == null) {
        return null;
      }

      Neo4jDB.instance = new Neo4jDB(uri!, username!, password!, drop!);
    }

    return Neo4jDB.instance;
  }

  private constructor(
    uri: string,
    username: string,
    password: string,
    drop: boolean
  ) {
    // this.uri = uri;
    // this.username = username;
    // this.password = password;

    this.driver = neo4j.driver(uri, neo4j.auth.basic(username, password));
    this.boot(drop);
  }

  private async boot(drop: boolean) {
    if (drop) await this.drop();
    await this.constraints();
  }

  async constraints() {
    const session = this.driver.session();

    await session.writeTransaction(async (tx: neo4j.Transaction) => {
      await tx.run(`CREATE INDEX ON :Recipe(key)`);
      await tx.run(`CREATE INDEX ON :Ingredient(name)`);
      // await tx.run(`CREATE CONSTRAINT ON (r:Recipe) ASSERT r.key IS UNIQUE`);
    });

    session.close();
  }

  async drop() {
    const session = this.driver.session();

    await session.writeTransaction(async (tx: neo4j.Transaction) => {
      tx.run(`MATCH(n) DETACH DELETE n`);
    });

    session.close();
  }

  async addRecipeAndIngredients(recipe: IRecipe) {
    const session = this.driver.session();

    await session.writeTransaction(async (tx: neo4j.Transaction) => {
      await this.insertRecipe(recipe, tx);
      await this.insertIngredients(recipe.tags!, tx);

      recipe.tags!.forEach(async tag => {
        await tx.run(
          `MATCH (r:Recipe {key:{key}}), (i:Ingredient {name:{name}}) CREATE (i)-[:IN]->(r)`,
          { key: recipe.key, name: tag.name }
        );
      });
    });

    session.close();
  }

  async insertRecipe(recipe: IRecipe, tx: neo4j.Transaction) {
    tx.run(
      `
          MERGE (r:Recipe {
            key:{key},
            title:{title},
            directions:{directions},
            ingredients:{ingredients},
            categories:{categories}
            })
        `,
      recipe
    );
  }

  async insertIngredients(tags: IRecipeTag[], tx: neo4j.Transaction) {
    tags.forEach(async tag => {
      tx.run(`MERGE (i:Ingredient {name: {name}})`, tag);
    });
  }

  async getTags() {
    const session = this.driver.session();

    let tags: neo4j.Record[] = [];

    await session.writeTransaction(async (tx: neo4j.Transaction) => {
      let response = await tx.run(`MATCH (i:Ingredient) return i.name`);

      tags = response.records;
    });

    await session.close();

    return tags;
  }

  async getRecipe(key: string) {
    const session = this.driver.session();

    let recipe: neo4j.Record[] = [];

    await session.writeTransaction(async (tx: neo4j.Transaction) => {
      let response = await tx.run(`MATCH (r:Recipe {key:{key}}) return r`, {
        key
      });

      recipe = response.records;
    });

    await session.close();

    return recipe;
  }
}
