import express from "express";
import { Event } from "../MongoModels/eventModel.js";

const router = express.Router();

// ✅ POST /events — create a new event
router.post("/", async (req, res) => {
  try {
    const {
      name,
      associationName,
      associationHead,
      email,
      startDate,
      endDate,
      startTime,
      endTime,
      venue,
      description,
      banner,
      registrationLink,
    } = req.body;

    // ✅ Automatically set 'date' = 'startDate'
    const date = startDate;

    // ✅ Validate required fields (manually, to give better error messages)
    if (
      !name ||
      !email ||
      !startDate ||
      !endDate ||
      !startTime ||
      !endTime ||
      !venue ||
      !associationName ||
      !associationHead ||
      !banner
    ) {
      return res.status(400).json({
        message: "Please fill all required fields before submitting.",
      });
    }

    // ✅ Create new event document
    const newEvent = new Event({
      name,
      date,
      associationName,
      associationHead,
      email,
      startDate,
      endDate,
      startTime,
      endTime,
      venue,
      banner,
      description,
      registrationLink,
      status: "Pending", // 🟩 default status
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("❌ Error saving event:", error.message);
    res.status(500).json({
      message: "Failed to save event",
      error: error.message,
    });
  }
});

// ✅ GET /events — fetch all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;