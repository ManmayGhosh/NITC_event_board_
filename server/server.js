import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173" })); // lock to frontend origin
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);

app.listen(process.env.PORT, ()=> console.log(`Server listening on ${process.env.PORT}`));
