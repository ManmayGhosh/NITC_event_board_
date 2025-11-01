import express from "express";
const router = express.Router();

const events = [
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

export default router;
