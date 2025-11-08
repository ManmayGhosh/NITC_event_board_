const mongoose = require('mongoose');

const adminHandlingAssociationHeadSchema = new mongoose.Schema({
  slNo: {
    type: Number,
    required: true,
  },
  associationName: {
    type: String,
    required: true,
  },
  associationHeadName: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    unique: true,           
  email: {
    type: String,
    required: true,
    unique: true,           
    match: /^[a-zA-Z0-9._%+-]+@nitc\.ac\.in$/,  
  },
}, { timestamps: true });

const AdminHandlingAssociationHead = mongoose.model(
  'adminHandlingAssociationHeads',
  adminHandlingAssociationHeadSchema
);

module.exports = AdminHandlingAssociationHead;
