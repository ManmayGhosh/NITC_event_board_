import express from "express";
import { sendEmail } from "../utils/emailService.js";
import { Event } from "../MongoModels/eventModel.js";
import { logAdminAction } from "../utils/adminLogger.js";

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

// 🟡 Review route — notify association head and delete event
router.post("/:id/review", async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // 🟩 Compose review email
    const subject = `Event "${event.name}" — Review Requested`;
    const message = `
      <p>Dear ${event.associationHead},</p>
      <p>Your event <strong>${event.name}</strong> has been placed under <span style="color:orange;"><strong>Review</strong></span> by the Admin.</p>
      <p><strong>Reason:</strong> ${reason}</p>
      <p>Please contact the Admin or resubmit your event with the necessary corrections.</p>
      <br>
      <p>— NITC Events Management System</p>
    `;

    // Send the email
    await sendEmail(event.email, subject, message);

    // Delete the event afterward
    await Event.findByIdAndDelete(id);

    res.status(200).json({ message: "Review email sent and event deleted." });
  } catch (error) {
    console.error("Error reviewing event:", error.message);
    res.status(500).json({ message: "Failed to review event" });
  }
});

// DELETE /events/:id — remove an event completely
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Event.findByIdAndDelete(id);

    // 🟡 Send deletion email
    const subject = `Event "${event.name}" — Deleted from Portal`;
    const message = `
      <p>Dear ${event.associationHead},</p>
      <p>Your event <strong>${
        event.name
      }</strong> has been permanently deleted from the NITC Events portal by the Admin.</p>
      <p>Status before deletion: ${event.status || "Unknown"}</p>
      <br>
      <p>— NITC Events Management System</p>
    `;

    await sendEmail(event.email, subject, message);
    // 🧾 Log deletion
    logAdminAction("Deleted event", event.name);
    
    res
      .status(200)
      .json({ message: "Event deleted and email notification sent." });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    res.status(500).json({ message: "Failed to delete event" });
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const event = await Event.findByIdAndUpdate(id, { status }, { new: true });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 🟩 Prepare email message
    const subject = `Event "${event.name}" — Status Update`;
    let message;

    if (status === "Approved") {
      message = `
        <p>Dear ${event.associationHead},</p>
        <p>Your event <strong>${
          event.name
        }</strong> has been <span style="color:green;"><strong>Approved</strong></span> by the Admin.</p>
        <p>Event Date: ${new Date(event.startDate).toDateString()} at ${
        event.startTime
      }</p>
        <p>Venue: ${event.venue}</p>
        <p>Congratulations! 🎉</p>
        <br>
        <p>— NITC Events Management System</p>
      `;
    } else if (status === "Review Requested") {
      message = `
        <p>Dear ${event.associationHead},</p>
        <p>Your event <strong>${event.name}</strong> is currently under <span style="color:orange;"><strong>Review</strong></span>.</p>
        <p>Please contact the Admin if further clarification is needed.</p>
        <br>
        <p>— NITC Events Management System</p>
      `;
    } else if (status === "Denied") {
      message = `
        <p>Dear ${event.associationHead},</p>
        <p>We regret to inform you that your event <strong>${event.name}</strong> has been <span style="color:red;"><strong>Denied</strong></span>.</p>
        <p>Please reach out to the Admin for further details.</p>
        <br>
        <p>— NITC Events Management System</p>
      `;
    }

    // 🟢 Send the email
    await sendEmail(event.email, subject, message);
    // 🧾 Log admin action
    logAdminAction(`Updated event status to "${status}"`, event.name);

    res.status(200).json(event);
  } catch (err) {
    console.error("Error updating event status:", err);
    res.status(500).json({ message: "Failed to update event status" });
  }
});

export default router;
