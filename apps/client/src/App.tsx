import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/api/v1")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      });
  }, []);

  return (
    <main>
      <h1 className="text-lg text-xl">{message}</h1>
    </main>
  );
}

export default App;
