import express from "express";
import { addPrayer } from "../services/sheets.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { text } = req.body;   // MUST MATCH FRONTEND

    if (!text) {
      return res.status(400).json({ error: "Prayer text required" });
    }

    await addPrayer(text);

    res.json({ success: true });
  } catch (error) {
    console.error("Prayer route error:", error);
    res.status(500).json({ error: "Failed to add prayer" });
  }
});

export default router;
