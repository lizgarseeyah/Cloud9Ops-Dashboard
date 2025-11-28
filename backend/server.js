import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import sinsRoutes from "./routes/sins.js";
import prayerRoutes from "./routes/prayer.js";
import todoRoutes from "./routes/todo.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/sins", sinsRoutes);
app.use("/api/prayer", prayerRoutes);
app.use("/api/todo", todoRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});