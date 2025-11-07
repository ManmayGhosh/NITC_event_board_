import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // lock to frontend origin
app.use(express.json());

app.use("/events", eventsRoutes);
app.use("/api/auth", authRoutes);

//Connects MongoDB to server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("App conected to database");
    app.listen(process.env.PORT, () =>
      console.log(`Server listening on ${process.env.PORT}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });
