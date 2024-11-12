import { defineEventHandler, getQuery } from "h3";
import { JokeSchema } from "../models/Joke.schema";

export default defineEventHandler(async (event) => {
  const { type } = getQuery(event);
  try {
    let jokes;
    if (type) {
      jokes = await JokeSchema.find({ type });
    } else {
      jokes = await JokeSchema.find({});
    }
    return jokes;
  } catch (error) {
    throw createError({
      message: error as string,
      statusMessage: "Failed to read the data file",
    });
  }
});
