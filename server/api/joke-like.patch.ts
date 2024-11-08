import { defineEventHandler } from "h3";
import { promises as fs } from "fs";
import { join } from "path";
import { Joke } from "~/interfaces";

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);
  const filePath = join(process.cwd(), "public/data/jokes.json");
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const jokes = JSON.parse(fileContent) as Joke[];
    const jokeToLike = jokes.find((joke) => joke.id === id);
    if (jokeToLike) {
      jokeToLike.likes++;
      await fs.writeFile(filePath, JSON.stringify(jokes, null, 2), "utf-8");
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: "The joke to like does not exist",
      });
    }
    return jokeToLike;
  } catch (error) {
    throw createError({
      statusMessage: "Failed to like the joke",
    });
  }
});
