import { LocationModel, LocationPriceModel } from "@packages/interfaces";
import { location_prices, locations } from "@prisma/client";

const mapLocationPriceDBToAPI = (price: location_prices): LocationPriceModel => ({
  id: price.id,
  locationId: price.location_id,
  priceInCents: price.price_in_cents,
  durationInMinutes: price.duration_in_minutes,
  name: price.name,
  description: price.description ?? undefined,
});

export const mapDBToAPI = ({
  location,
  prices,
}: {
  location: locations;
  prices: location_prices[];
}): LocationModel => {
  return {
    id: location.id,
    name: location.name,
    postcode: location.postcode,
    prices: prices.map(mapLocationPriceDBToAPI),
  };
};
