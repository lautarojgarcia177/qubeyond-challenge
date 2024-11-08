import { defineEventHandler } from "h3";
import { Joke } from "~/interfaces";

async function invalidateCache() {
  //cache invalidation
  const cacheStorage = useStorage("cache:nitro");
  const cachedKeys = await cacheStorage.getKeys();
  await Promise.all(cachedKeys.map((key) => cacheStorage.removeItem(key)));
}

export default defineEventHandler(async (event) => {
  await invalidateCache();
  
  const { id } = await readBody(event);
  try {
    let jokes = (await useStorage("assets:server").getItem(
      "jokes.json"
    )) as Joke[];
    const jokeToLike = jokes.find((joke) => joke.id === id);
    if (jokeToLike) {
      jokeToLike.likes++;
      await useStorage("assets:server").setItemRaw(
        "jokes.json",
        JSON.stringify(jokes, null, 2)
      );
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: "The joke to like does not exist",
      });
    }
    await invalidateCache();
    jokes = (await useStorage("assets:server").getItem("jokes.json")) as Joke[];
    return jokes.find((joke) => joke.id === id);
  } catch (error) {
    throw createError({
      statusMessage: "Failed to like the joke",
    });
  }
});
