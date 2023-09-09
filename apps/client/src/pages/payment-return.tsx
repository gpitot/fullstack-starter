import { PaymentModel, PaymentsService } from "@packages/interfaces";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentReturn: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [payment, setPayment] = useState<PaymentModel>();

  const paymentIntentId = searchParams.get("payment_intent");

  useEffect(() => {
    if (paymentIntentId) {
      PaymentsService.getPayments({ paymentIntentId }).then((res) => {
        setPayment(res.payment);
      });
    }
  }, []);
  return (
    <main>
      <h1> Thanks for paying</h1>
      {payment && (
        <div>
          <h2>{payment.status}</h2>
          {payment.receiptUrl && <a href={payment.receiptUrl}>View Receipt</a>}
        </div>
      )}
    </main>
  );
};

export default PaymentReturn;
