import express from "express";
import Stripe from "stripe";
import { GetPaymentResponse } from "@packages/interfaces";
import stripe from "../../services/payments";
import prisma from "../../db";

const router = express.Router();
const endpointSecret = "whsec_9994189d590090fa676f7b28c2a15eef908f997dde97b0296026d1b6645a9941";

export const webhookHandler = async (req: express.Request, res: express.Response) => {
  let webhookEvent: Stripe.Event;
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers["stripe-signature"] as string;
    try {
      webhookEvent = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err);
      return res.sendStatus(400);
    }

    switch (webhookEvent.type) {
      case "charge.succeeded": {
        const success = webhookEvent.data.object as { payment_intent: string; receipt_url: string };
        console.log("PaymentIntent was successful!", success);
        await prisma.payments.updateMany({
          where: {
            transaction_id: success.payment_intent,
          },
          data: {
            payment_status: "PAYMENT_COMPLETE",
            receipt_url: success.receipt_url,
          },
        });
        break;
      }
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${webhookEvent.type}`);
    }
  }

  return res.sendStatus(200);
};

router.get<{ paymentIntentId: string }, GetPaymentResponse>(
  "/:paymentIntentId",
  async (req, res) => {
    const payment = await prisma.payments.findFirst({
      where: {
        transaction_id: req.params.paymentIntentId,
      },
    });
    if (!payment) {
      return res.sendStatus(404);
    }
    return res.json({
      payment: {
        status: payment.payment_status,
        receiptUrl: payment.receipt_url ?? undefined,
      },
    });
  },
);

export default router;
