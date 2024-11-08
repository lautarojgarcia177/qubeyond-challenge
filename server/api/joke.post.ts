import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const { type, setup, punchline } = await readBody(event);
  try {
    const newJoke = await new JokeSchema({ type, setup, punchline }).save();
    return newJoke;
  } catch (error) {
    throw createError({
      message: error as string,
      statusMessage: "Failed to create the new joke",
    });
  }
});
