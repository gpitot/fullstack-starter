import { LocationsService } from "@packages/interfaces";
import { useQuery } from "@tanstack/react-query";

export const Locations = {
  useGetLocations: () => useQuery(["locations"], () => LocationsService.getLocations()),
};
