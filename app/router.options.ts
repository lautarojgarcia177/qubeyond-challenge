import type { RouterConfig } from "@nuxt/schema";

export default {
  routes: (_routes) => [
    {
      path: "/",
      component: () => import("~/pages/index.vue"),
      children: [
        {
          path: ":jokeType/",
          component: () => import("~/pages/index.vue")
        },
      ],
    },
  ],
} satisfies RouterConfig;
