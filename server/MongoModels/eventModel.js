import mongoose from "mongoose";


const eventSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
    match: /^([0-1]\d|2[0-3]):([0-5]\d)$/, // Matches HH:MM (24-hour format)
  },
  venue: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true,
  },
  associationHead: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true,
  },
  banner: {
    type: String,
    required: true,
    match: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)?/, // basic image URL check
  },
}, { timestamps: true });

export const Event = mongoose.model("event", eventSchema);
