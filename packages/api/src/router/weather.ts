import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const weatherRouter = createTRPCRouter({
  get: publicProcedure.query(() => {
    console.log("hello world");
    return { city: "Houston" };
  }),
  getLocation: publicProcedure
    .input(z.object({ lat: z.number(), lng: z.number() }))
    .query(() => {
      console.log("hello world");
      return { city: "Houston" };
    }),
});
