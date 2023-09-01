import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home";
import Payment from "../pages/payment";
import PaymentReturn from "../pages/payment-return";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/payments",
    element: <Payment />,
  },
  {
    path: "/payment-complete",
    element: <PaymentReturn />,
  },
]);

const routes: React.FC = () => <RouterProvider router={router} />;
export default routes;
