import express from "express";
import morgan from "morgan";
import "dotenv/config";
import helmet from "helmet";
import cors from "cors";
import * as middlewares from "./middlewares";
import api from "./api";
import { webhookHandler } from "./api/payments";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  return webhookHandler(req, res);
});

app.use(express.json());

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
