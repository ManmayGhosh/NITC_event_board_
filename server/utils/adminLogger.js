import fs from "fs";
import path from "path";

// Generate a consistent log file location (inside /logs)
const logDir = path.resolve("logs");
const logFilePath = path.join(logDir, "admin_actions.log");

// Ensure /logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

/**
 * Logs admin actions to a local file.
 * @param {string} action - Description of what happened (e.g., "Approved Event", "Deleted Association Head").
 * @param {string} target - The name of the entity affected (e.g., "TechnoFest 2025" or "John Doe").
 * @param {string} [adminName="System"] - Who performed the action (if available).
 */
export const logAdminAction = (action, target, adminName = "Admin") => {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  const logEntry = `[${timestamp}] ${adminName} performed action: "${action}" on "${target}"\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error("❌ Failed to write to admin log:", err);
    } else {
      console.log("🧾 Admin action logged:", logEntry.trim());
    }
  });
};
