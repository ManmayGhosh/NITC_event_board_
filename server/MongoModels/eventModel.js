import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
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
    email: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9._%+-]+@nitc\.ac\.in$/,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    associationName: {
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
      match: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)?/,
    },
    description: {
      type: String,
      maxlength: 200,
      default: function () {
        return this.name;
      },
    },
    registrationLink: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Denied", "Review Requested"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("event", eventSchema);
