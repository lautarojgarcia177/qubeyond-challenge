import { defineEventHandler } from "h3";
import { promises as fs } from "fs";
import { join } from "path";
import { Joke } from "~/interfaces";

export default defineEventHandler(async (event) => {
  const jokeId = getRouterParam(event, "id");
  const filePath = join(process.cwd(), "public/data/jokes.json");
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    let jokes = JSON.parse(fileContent) as Joke[];
    const jokeToDelete = jokes.find((joke) => joke.id === jokeId);
    if (jokeToDelete) {
      jokes = jokes.filter((joke) => joke.id !== jokeToDelete.id);
      await fs.writeFile(filePath, JSON.stringify(jokes, null, 2), "utf-8");
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: "The joke to delete does not exist",
      });
    }
    return "Joke deleted";
  } catch (error) {
    throw createError({
      statusMessage: "Failed to delete the joke",
    });
  }
});
