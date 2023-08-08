import express from "express";

import { DemoModel } from "interfaces";

const router = express.Router();

router.get<unknown, DemoModel>("/demo", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

export default router;
