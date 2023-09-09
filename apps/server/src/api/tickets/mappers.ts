import { CreateTicketModel, TicketModel } from "@packages/interfaces";
import { tickets } from "@prisma/client";

export const mapDBToAPI = (ticket: tickets): TicketModel => {
  return {
    location: ticket.location,
    registration: ticket.registration,
    email: ticket.email,
    createdAt: ticket.created_at.toISOString(),
    expiresAt: ticket.expires_at.toISOString(),
    locationPriceId: ticket.location_price_id,
    id: ticket.id,
  };
};

export const mapAPIToDB = (
  ticket: CreateTicketModel,
): Omit<tickets, "id" | "created_at" | "expires_at"> => {
  return {
    location: ticket.location,
    registration: ticket.registration,
    email: ticket.email,
    location_price_id: ticket.locationPriceId,
  };
};
