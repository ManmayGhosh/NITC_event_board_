import express from "express";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const email = payload.email || "";
    if (!email.endsWith("@nitc.ac.in")) {
      return res.json({ success: false, message: "Only @nitc.ac.in allowed" });
    }

    // optionally create/find user in DB, assign role
    const user = { name: payload.name, email: payload.email, picture: payload.picture };

    // optionally sign own JWT and return it
    // import jwt from 'jsonwebtoken'; const token = jwt.sign({email,role:'user'}, process.env.JWT_SECRET);

    return res.json({ success: true, user /*, token*/ });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: "Invalid token" });
  }
});

export default router;
