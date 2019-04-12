import * as fs from "fs";
import * as csvParse from "csv-parse";
import { join } from "path";
import { isEmpty }  from "lodash";
import { IRecipe } from 'src/types/';

const DATA_DIR = "./data";
const RECIPE_FILE = join(DATA_DIR, "full_format_recipes.json");
const CSV_FILE = join(DATA_DIR, "epi_r.csv");

/**
 * Parses and returns all recipes in IRecipe format
 */
export async function getAllRecipes(): Promise<IRecipe[]> {
  let recipesArray = parseRecipes(RECIPE_FILE);
  let csvOutput = await parseCSVPromise(CSV_FILE);

  let mistmatches = 0;

  for (let r = 0; r < recipesArray.length; r++) {
    let curRecipe = recipesArray[r];
    let curLine = csvOutput[curRecipe.titleKey || ''];

    if (curLine == null) {
      console.error(`Entry not found ${curRecipe.titleKey}`);
      mistmatches++;
      continue;
    }

    curRecipe.tags = Object.keys(curLine).reduce((acc: string[], key) => {
      if (curLine[key] !== "1.0") return acc;

      return [...acc, key];
    }, []);

  }
  console.log(mistmatches);
  return recipesArray;
}

/**
 * Parses recipes from a JSON. JSON is expected to be in partial IRecipe format.
 * @param {string} filename - The JSON file containing the recipes
 */
function parseRecipes(filename: string): IRecipe[] {
  let fileContents = fs.readFileSync(filename, "utf8");
  let recipesArray: IRecipe[] = JSON.parse(fileContents);

  console.log(filename, recipesArray.length);

  // Some recipes are empty objects - this returns the array after filtering them
  recipesArray = recipesArray.filter(recipe => {
    return !isEmpty(recipe);
  })

  recipesArray.forEach(recipe => {
    recipe.titleKey = recipe.title.replace(/\W/g, '').toLowerCase().trim();
  });

  return recipesArray;
}

/**
 * Parses the extended information from the CSV
 * @param {string} filename - The CSV file containing the extended information
 * @returns {promise} - A promise that once returned contains an object with recipe titles as keys
 */
function parseCSVPromise(filename: string): Promise<{ [s: string]: any }> {
  return new Promise((resolve, reject) => {
    let parser = new csvParse.Parser({
      delimiter: ",",
      columns: true
    });

    let output: { [s: string]: any } = {};

    fs.createReadStream(filename)
      .pipe(parser)
      .on("data", data => {
        let title = data.title.replace(/\W/g, '').toLowerCase().trim();
        output[title] = data;
      })
      .on("error", error => {
        console.error(`Error when parsing: ${error}`);
        reject(error);
      })
      .on("end", () => {
        resolve(output);
      });
  });
}
