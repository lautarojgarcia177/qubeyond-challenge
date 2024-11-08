import { defineEventHandler, getQuery } from "h3";
import { promises as fs } from "fs";
import { join } from "path";
import { Joke } from "~/interfaces";

export default defineEventHandler(async (event) => {
  const { count, offset, type, id } = getQuery(event);
  const filePath = join(process.cwd(), "server/data/jokes.json");
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    let jokes = JSON.parse(fileContent) as Joke[];
    if (offset && count) {
      jokes = jokes.slice(Number(offset), Number(offset) + Number(count));
    }
    if (type) {
      jokes = jokes.filter((joke) => joke.type === type);
    }
    return jokes;
  } catch (error) {
    throw createError({
      message: error as string,
      statusMessage: "Failed to read the data file",
    });
  }
});
