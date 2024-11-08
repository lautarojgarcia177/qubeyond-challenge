import { defineEventHandler, getQuery } from "h3";
import { JokeSchema } from "../models/Joke.schema";

export default defineEventHandler(async (event) => {
  const { count, offset, type, id } = getQuery(event);
  try {
    let jokes = await JokeSchema.find({})
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