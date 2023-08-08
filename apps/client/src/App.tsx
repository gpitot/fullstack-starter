import { useEffect, useState } from "react";
import { DemoService } from "interfaces";
function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    DemoService.getDemo({ firstname: "Guillaume" }).then((res) => {
      setMessage(res.message);
    });
  }, []);

  return (
    <main>
      <h1 className="p-10 text-xl">{message}</h1>
    </main>
  );
}

export default App;
