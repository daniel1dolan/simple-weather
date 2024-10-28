import { z } from "zod";

import { getByLocation } from "@simple-weather/weather";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const weatherRouter = createTRPCRouter({
  get: publicProcedure.query(() => {
    console.log("hello world");
    return { city: "Houston" };
  }),
  // TODO: change austin,tx set to be testing only
  /** Gets weather data based on a location.
   * If no location is specified, will fallback to user's location.
   * If user's location cannot be determined, will fallback to Austin, TX in Testing.
   */
  getLocation: publicProcedure
    .input(z.object({ lat: z.string().optional(), lng: z.string().optional() }).optional())
    .query(async ({ input, ctx }) => {
      let { lat, lng } = input ?? {};


      if ((!lat || !lng) && ctx?.req?.geo) {
        lat = ctx.req.geo.latitude;
        lng = ctx.req.geo.longitude;
      }

      if (!lat || !lng) {
        lat = "30.2672";
        lng = "-97.7431";
      }

      const res = await getByLocation(lat, lng);
      return res;
    }),
});
