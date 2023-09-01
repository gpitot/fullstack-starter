import express from "express";
import Stripe from "stripe";
import { GetPaymentResponse, PaymentStatus } from "@packages/interfaces";
import stripe from "../../services/payments";
import prisma from "../../db";

const router = express.Router();
const endpointSecret = "whsec_9994189d590090fa676f7b28c2a15eef908f997dde97b0296026d1b6645a9941";

const getPaymentDetails = (event: Stripe.Event) => {
  const typedEvent = event as unknown as {
    type: string;
    payment_intent: string;
    receipt_url: string;
  };
  let status: PaymentStatus;
  switch (typedEvent.type) {
    case "charge.succeeded": {
      status = "PAYMENT_COMPLETE";
      break;
    }
    case "charge.failed": {
      status = "PAYMENT_FAILED";
      break;
    }
    default: {
      return null;
    }
  }
  return {
    status,
    paymentIntentId: typedEvent.payment_intent,
    receipt_url: typedEvent.receipt_url,
  };
};

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

    const details = getPaymentDetails(webhookEvent);

    if (!details) {
      return res.sendStatus(200);
    }

    await prisma.payments.updateMany({
      where: {
        transaction_id: details.paymentIntentId,
      },
      data: {
        payment_status: details.status,
        receipt_url: details.receipt_url,
      },
    });
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
