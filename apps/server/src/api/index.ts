import express from "express";
import locations from "./locations";
import tickets from "./tickets";
import payments from "./payments";

const router = express.Router();

router.use("/locations", locations);
router.use("/tickets", tickets);
router.use("/payments", payments);

export default router;
