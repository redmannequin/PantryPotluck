import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  console.log("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
} else {
  console.error("No .env file found. Exiting");
  process.exit(1);
}

export const NEO4J_URI = process.env["NEO4J_URI"];
export const NEO4J_USERNAME = process.env["NEO4J_USERNAME"];
export const NEO4J_PASSWORD = process.env["NEO4J_PASSWORD"];

if (!NEO4J_URI) {
  console.error(
    "No neo4j connection string. Set NEO4J_URI environment variable."
  );
  process.exit(1);
}
if (!NEO4J_USERNAME) {
  console.error(
    "No neo4j username set. Set NEO4J_USERNAME environment variable."
  );
  process.exit(1);
}
if (!NEO4J_PASSWORD) {
  console.error(
    "No neo4j password set. Set NEO4J_PASSWORD environment variable."
  );
  process.exit(1);
}
