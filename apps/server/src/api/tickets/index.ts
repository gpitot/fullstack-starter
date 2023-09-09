import express from "express";
import { CreateTicketModel, GetTicketResponse, PostTicketResponse } from "@packages/interfaces";
import TicketService from "../../services/tickets";
import stripe from "../../services/payments";
import prisma from "../../db";
import { mapAPIToDB, mapDBToAPI } from "./mappers";

const router = express.Router();

router.get<{ ticketId: string }, GetTicketResponse>("/:ticketId", async (req, res) => {
  const ticketService = new TicketService();
  const ticket = await ticketService.getTicket(req.params.ticketId);
  if (!ticket) {
    return res.sendStatus(404);
  }
  return res.json({ ticket: mapDBToAPI(ticket) });
});

router.post<unknown, PostTicketResponse, CreateTicketModel>("/", async (req, res) => {
  const dbTicket = mapAPIToDB(req.body);

  const location = await prisma.locations.findFirst({
    where: {
      id: dbTicket.location,
    },
    include: {
      location_prices: true,
    },
  });

  if (!location) {
    return res.sendStatus(404);
  }

  const price = location.location_prices.find((l) => l.id === dbTicket.location_price_id);
  if (!price) {
    return res.sendStatus(404);
  }
  const ticketService = new TicketService();
  const ticket = await ticketService.createTicket(dbTicket, price.duration_in_minutes);

  const amountInCents = price.price_in_cents;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: "aud",
  });

  if (!paymentIntent.client_secret) {
    return res.sendStatus(500);
  }

  const payment = await prisma.payments.create({
    data: {
      transaction_id: paymentIntent.id,
      amount_in_cents: amountInCents,
    },
  });

  await prisma.ticket_payments.create({
    data: {
      ticket_id: ticket.id,
      payment_id: payment.id,
    },
  });

  return res.json({
    ticket: mapDBToAPI(ticket),
    payment: {
      clientSecret: paymentIntent.client_secret,
      amountInCents,
    },
  });
});

export default router;
