import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);
  try {
    const updatedJoke = await JokeSchema.findOneAndUpdate(
      { _id: id },
      { $inc: { likes: 1 } },
      { returnDocument: "after" }
    );
    return updatedJoke;
  } catch (error) {
    throw createError({
      message: error as string,
      statusMessage: "Failed to like the joke",
    });
  }
});
