import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// ✅ GET /api/admin/download-logs
router.get("/download-logs", (req, res) => {
  try {
    const logPath = path.resolve("logs", "admin_actions.log");

    if (!fs.existsSync(logPath)) {
      return res.status(404).json({ message: "No logs found yet." });
    }

    res.download(logPath, "admin_actions.log", (err) => {
      if (err) {
        console.error("❌ Error sending log file:", err);
        res.status(500).send("Error downloading file.");
      }
    });
  } catch (error) {
    console.error("❌ Log download failed:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
