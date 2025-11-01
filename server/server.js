import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google OAuth verification
app.post("/api/auth/google", async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload.email.endsWith("@nitc.ac.in")) {
      return res.status(401).json({ message: "Only NITC emails allowed" });
    }

    res.json({ user: { name: payload.name, email: payload.email } });
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
});

const events = [
  {
    _id: 1,
    name: "Tech Fest",
    date: "2025-11-12",
    time: "10:00 AM",
    venue: "Auditorium",
    associationHead: "Dr. Rao",
    banner: "https://picsum.photos/400/200?random=1",
  },
  {
    _id: 2,
    name: "Cultural Night",
    date: "2025-11-20",
    time: "7:00 PM",
    venue: "Main Ground",
    associationHead: "Prof. Nair",
    banner: "https://picsum.photos/400/200?random=2",
  },
];

app.get("/api/events", (req, res) => res.json(events));

app.listen(process.env.PORT, () =>
  console.log(`✅ Server running on port ${process.env.PORT}`)
);
