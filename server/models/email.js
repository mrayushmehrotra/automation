const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  to: String,
  subject: String,
  body: String,
  sendAt: Date,
  status: { type: String, enum: ['pending', 'sent'], default: 'pending' },
});

module.exports = mongoose.model('Email', emailSchema);
