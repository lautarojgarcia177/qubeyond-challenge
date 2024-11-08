import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const jokeId = getRouterParam(event, "id");
  try {
    await JokeSchema.findOneAndDelete({ _id: jokeId })
    return "Joke deleted";
  } catch (error) {
    throw createError({
      message: error as string,
      statusMessage: "Failed to delete the joke",
    });
  }
});
