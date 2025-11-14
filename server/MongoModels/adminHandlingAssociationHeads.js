import mongoose from "mongoose";

const adminHandlingAssociationHeadSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@nitc\.ac\.in$/, // NITC email only
    },
    collegeId: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    associationName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    contactNumber: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/, // 10-digit mobile number
    },
  },
  { timestamps: true }
);

export const AdminHandlingAssociationHead = mongoose.model(
  "adminHandlingAssociationHeads",
  adminHandlingAssociationHeadSchema
);
