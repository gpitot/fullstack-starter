import express from "express";
import { DemoModel } from "@packages/interfaces";

const router = express.Router();

router.get<unknown, DemoModel, unknown, { firstname?: string }>(
  "/demo",
  (req, res) => {
    const { firstname } = req.query;
    res.json({
      message: `👋 ${firstname ?? ""} 🌎🌍🌏`,
    });
  },
);

export default router;
