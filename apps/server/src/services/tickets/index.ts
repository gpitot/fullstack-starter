import { tickets } from "@prisma/client";
import { addMinutes } from "date-fns";
import prisma from "../../db";

class TicketService {
  constructor() {}

  async createTicket(
    ticket: Omit<tickets, "id" | "expires_at" | "created_at">,
    durationInMinutes: number,
  ) {
    const now = new Date();
    const data = await prisma.tickets.create({
      data: {
        ...ticket,
        created_at: now,
        expires_at: addMinutes(now, durationInMinutes),
      },
    });
    return data;
  }

  async getTicket(id: string) {
    const ticket = await prisma.tickets.findUnique({
      where: {
        id,
      },
    });
    return ticket;
  }

  async getTicketsByEmailAndRego({ email, registration }: { email: string; registration: string }) {
    return prisma.tickets.findMany({
      where: {
        email,
        registration,
      },
    });
  }

  async extendTicketTime() {}

  async sendTicketReminder() {}
}
export default TicketService;
