import QueryProvider from "./providers/QueryProvider";
import Routes from "./routes";
function App() {
  return (
    <QueryProvider>
      <Routes />
    </QueryProvider>
  );
}

export default App;
