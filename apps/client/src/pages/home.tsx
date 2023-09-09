import { useEffect, useState } from "react";
import { LocationModel, LocationsService, TicketsService } from "@packages/interfaces";

import { useNavigate } from "react-router-dom";
import * as API from "../api";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const { data: locationsData, isLoading } = API.Locations.useGetLocations();

  const createTicket = async () => {
    const result = await TicketsService.postTicket({
      requestBody: {
        location: "1",
        locationPriceId: "2",
        email: "Guillaume.pitot@gmail.com",
        registration: "123456789",
      },
    });
    const { payment } = result;
    navigate("/payments", { state: { payment } });
  };

  return (
    <main>
      <h1 className="p-10 pb-4 text-xl">
        {locationsData && locationsData.locations.map((location) => JSON.stringify(location))}

        <button onClick={createTicket}>Create Ticket</button>
      </h1>
    </main>
  );
};

export default Home;
