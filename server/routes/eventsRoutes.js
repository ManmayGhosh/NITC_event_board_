import express from "express";
const router = express.Router();
import { Event } from "../MongoModels/eventModel.js";

/*const events = [
  {
    _id: "1",
    name: "Tech Fest",
    date: "2025-11-12",
    time: "10:00",
    venue: "Auditorium",
    associationHead: "Dr. Rao",
    banner: "https://picsum.photos/seed/1/800/400"
  },
  {
    _id: "2",
    name: "Cultural Night",
    date: "2025-12-01",
    time: "19:00",
    venue: "Open Ground",
    associationHead: "Prof. Nair",
    banner: "https://picsum.photos/seed/2/800/400"
  },
  // ... more events ...
];

router.get("/", (req, res) => res.json(events));

*/

// Route to save event info to database
router.post("/", async (request, response) => {
  try {
    const { name, date, time, venue, associationHead, banner } = request.body;

    // Check for missing fields
    if (!name || !date || !time || !venue || !associationHead || !banner) {
      return response.status(400).send({
        message:
          "Please provide all required fields: name, date, time, venue, associationHead, and banner.",
      });
    }

    // Create a new event document
    const newEvent = {
      name:request.body.name,
      date:request.body.date,
      time:request.body.time,
      venue:request.body.venue,
      associationHead:request.body.associationHead,
      banner:request.body.banner,
    };

    const event = await Event.create(newEvent);
    return response.status(201).send(event);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all events from the database
router.get("/", async (request, response) => {
  try {
    const events = await Event.find({});
    return response.status(200).json({
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
