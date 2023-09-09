import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import * as stripeJs from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

import { PaymentIntentModel } from "@packages/interfaces";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

const Payment: React.FC = () => {
  const location = useLocation();
  const {
    payment: { clientSecret },
  } = location.state as { payment: PaymentIntentModel };
  console.log(location, location.state);
  if (!clientSecret) {
    throw new Error("No payment intent id provided");
  }
  const options = {
    // passing the client secret obtained from the server
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  } as stripeJs.StripeElementsOptions;

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
