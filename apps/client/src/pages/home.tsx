import { useEffect, useState } from "react";
import { LocationModel, LocationsService, TicketsService } from "@packages/interfaces";

import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [message, setMessage] = useState<LocationModel[]>();

  const navigate = useNavigate();

  useEffect(() => {
    LocationsService.getLocations().then((res) => {
      setMessage(res.locations);
    });
  }, []);

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
        {message?.map((location) => JSON.stringify(location))}

        <button onClick={createTicket}>Create Ticket</button>
      </h1>
    </main>
  );
};

export default Home;
