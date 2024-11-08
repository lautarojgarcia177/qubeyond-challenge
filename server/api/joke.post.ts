import { defineEventHandler } from "h3";
import { promises as fs } from "fs";
import { join } from "path";
import { Joke } from "~/interfaces";
import { v4 } from "uuid";

export default defineEventHandler(async (event) => {
  const { type, setup, punchline } = await readBody(event);
  const filePath = join(process.cwd(), "public/data/jokes.json");
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const jokes = JSON.parse(fileContent) as Joke[];
    const newJoke: Joke = {
      type,
      setup,
      punchline,
      likes: 0,
      id: v4(),
    };
    jokes.unshift(newJoke);
    await fs.writeFile(filePath, JSON.stringify(jokes, null, 2), "utf-8");
    return newJoke;
  } catch (error) {
    throw createError({
      statusMessage: "Failed to create the new joke",
    });
  }
});
