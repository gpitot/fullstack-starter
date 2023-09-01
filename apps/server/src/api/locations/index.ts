import express from "express";
import { GetLocationsResponse } from "@packages/interfaces";
import { omit } from "lodash";
import { location_prices, locations } from "@prisma/client";
import prisma from "../../db";
import { mapDBToAPI } from "./mappers";

const router = express.Router();

router.get<unknown, GetLocationsResponse, unknown>("/", async (_req, res) => {
  // const locations = await prisma.locations.findMany({});

  const prices = await prisma.location_prices.findMany({
    include: {
      locations: true,
    },
  });

  console.log(prices);
  if (!prices) {
    return res.sendStatus(404);
  }

  const locations: ({ location: locations } & {
    prices: location_prices[];
  })[] = [];
  for (const price of prices) {
    const locationIndex = locations.findIndex((l) => l.location.id === price.location_id);
    const locationAlreadyExists = locationIndex >= 0;
    if (!locationAlreadyExists) {
      locations.push({
        location: price.locations,
        prices: [],
      });
    }

    locations[locationAlreadyExists ? locationIndex : locations.length - 1].prices.push({
      ...omit(price, ["locations"]),
    });
  }

  const mappedLocations = locations.map(mapDBToAPI);
  return res.json({ locations: mappedLocations });
});

export default router;
