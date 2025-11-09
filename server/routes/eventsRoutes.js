import express from "express";
const router = express.Router();
import { Event } from "../MongoModels/eventModel.js";

// ✅ Create a new event
router.post("/", async (req, res) => {
  try {
    const {
      name,
      date,
      email,
      startDate,
      endDate,
      startTime,
      endTime,
      venue,
      associationName,
      associationHead,
      banner,
      description,
      registrationLink,
    } = req.body;

    // Check required fields
    if (
      !name ||
      !date ||
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
        message:
          "Please provide all required fields: name, date, email, startDate, endDate, startTime, endTime, venue, associationName, associationHead, and banner.",
      });
    }

    // Create and save event
    const newEvent = new Event({
      name,
      date,
      email,
      startDate,
      endDate,
      startTime,
      endTime,
      venue,
      associationName,
      associationHead,
      banner,
      description,
      registrationLink,
      status: "Pending", // default
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error saving event:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({});
    // Return a plain array to match frontend expectations
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// ✅ Update event status (Admin)
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (
      !["Pending", "Approved", "Denied", "Review Requested"].includes(status)
    ) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(updatedEvent);
  } catch (err) {
    console.error("Error updating event status:", err);
    res.status(500).json({ error: "Failed to update event status" });
  }
});

export default router;
