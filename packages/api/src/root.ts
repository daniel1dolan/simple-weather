import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { weatherRouter } from "./router/weather";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  weather: weatherRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
