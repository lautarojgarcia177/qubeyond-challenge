import { defineMongooseModel } from "#nuxt/mongoose";

export const JokeSchema = defineMongooseModel({
  name: "Joke",
  schema: {
    type: {
      type: "string",
      required: true,
    },
    setup: {
      type: "string",
      required: true,
    },
    punchline: {
      type: "string",
      required: true,
    },
    likes: {
      type: "number",
      default: 0,
    },
  },
});
