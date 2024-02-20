const mongoose = require('mongoose');

// Define the schema for resume templates
const resumeTemplateSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  filename: { type: String, required: true },
  Subscription: {
    type: String,
    required: true,
    enum: ['free', 'premium'] // Specify the allowed values
  },
  ImageLink: { type: String } // Add the ImageLink field
});

const ResumeTemplate = mongoose.model('ResumeTemplate', resumeTemplateSchema);

module.exports = ResumeTemplate;