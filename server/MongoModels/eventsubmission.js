const mongoose = require('mongoose');

const eventSubmissionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,         
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@nitc\.ac\.in$/,   
  },
  eventName: {
    type: String,
    required: true,
    maxlength: 50,
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
    maxlength: 50,
  },
  banner: {
    type: Buffer,          
    default: null,
  },
  description: {
    type: String,
    maxlength: 200,
    default: function() {
      return this.eventName;
    },
  },
  registrationLink: {
    type: String,
  },
  associationName: {
    type: String,
    maxlength: 50,
  },
}, { timestamps: true });

const EventSubmission = mongoose.model('eventSubmissions', eventSubmissionSchema);

module.exports = EventSubmission;
