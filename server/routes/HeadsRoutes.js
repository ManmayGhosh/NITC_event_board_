import express from "express";
import { AdminHandlingAssociationHead } from "../MongoModels/adminHandlingAssociationHeads.js";

const router = express.Router();

/**
 * @route   POST /heads
 * @desc    Add a new Association Head
 */
router.post("/", async (req, res) => {
  try {
    const { id, name, email, collegeId, associationName, contactNumber } = req.body;

    // Validate required fields
    if (!id || !name || !email || !collegeId || !associationName || !contactNumber) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    // Check for existing ID or email
    const existing = await AdminHandlingAssociationHead.findOne({
      $or: [{ id }, { email }],
    });
    if (existing) {
      return res.status(409).json({ message: "Head with given ID or email already exists." });
    }

    const newHead = new AdminHandlingAssociationHead({
      id,
      name,
      email,
      collegeId,
      associationName,
      contactNumber,
    });

    const savedHead = await newHead.save();
    res.status(201).json(savedHead);
  } catch (error) {
    console.error("Error adding association head:", error.message);
    res.status(500).json({ error: "Server error while adding association head." });
  }
});

/**
 * @route   GET /heads
 * @desc    Get all Association Heads
 */
router.get("/", async (req, res) => {
  try {
    const heads = await AdminHandlingAssociationHead.find().sort({ createdAt: -1 });
    res.status(200).json(heads);
  } catch (error) {
    console.error("Error fetching heads:", error.message);
    res.status(500).json({ error: "Server error while fetching association heads." });
  }
});

/**
 * @route   PATCH /heads/:id
 * @desc    Edit an existing Association Head
 */
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedHead = await AdminHandlingAssociationHead.findOneAndUpdate(
      { id: id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedHead) {
      return res.status(404).json({ message: "Association Head not found." });
    }

    res.status(200).json(updatedHead);
  } catch (error) {
    console.error("Error updating head:", error.message);
    res.status(500).json({ error: "Server error while updating association head." });
  }
});

/**
 * @route   DELETE /heads/:id
 * @desc    Delete an Association Head
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AdminHandlingAssociationHead.findOneAndDelete({ id: id });

    if (!deleted) {
      return res.status(404).json({ message: "Association Head not found." });
    }

    res.status(200).json({ message: "Association Head deleted successfully." });
  } catch (error) {
    console.error("Error deleting head:", error.message);
    res.status(500).json({ error: "Server error while deleting association head." });
  }
});

/**
 * @route   GET /heads/check
 * @desc    Check if a given email belongs to an association head
 * @query   ?email=<email>
 * @returns { exists: boolean, head?: object }
 */
router.get("/check", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email query parameter is required." });
    }

    // Case-insensitive email match
    const head = await AdminHandlingAssociationHead.findOne({
      email: { $regex: new RegExp("^" + email + "$", "i") },
    });

    if (head) {
      return res.status(200).json({
        exists: true,
        head,
      });
    } else {
      return res.status(200).json({
        exists: false,
      });
    }
  } catch (error) {
    console.error("Error checking association head:", error.message);
    res.status(500).json({ error: "Server error while checking association head." });
  }
});


export default router;
