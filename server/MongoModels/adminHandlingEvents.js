const mongoose = require('mongoose');

const adminHandlingEventSchema = new mongoose.Schema({
  slNo: {
    type: Number,
    required: true,
    unique: true,       
  },
  id: {
    type: Number,
    required: true,
    ref: 'eventSubmissions',   
  },
  status: {
    type: String,
    required: true,
    enum: ['approved', 'denied', 'require re-apply'],  
    default: 'require re-apply',
  },
}, { timestamps: true });

const AdminHandlingEvent = mongoose.model('adminHandlingEvents', adminHandlingEventSchema);

module.exports = AdminHandlingEvent;
