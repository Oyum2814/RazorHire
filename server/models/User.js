const mongoose = require("mongoose");
const resumeSchema = require("./Resume");

const projectSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Add default id field
  Title: { type: String, required: true }, // Add Title field
  ResumeTemplateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ResumeTemplate",
    required: true,
  },
  Content: {
    type: mongoose.Schema.Types.ObjectId, // Change the type to Object ID
    ref: "Resume", // Reference to the Resume model
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
});

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true, // Make the email field required if needed
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Add the MyProjects field as an array of project objects
  MyProjects: [projectSchema],
});

module.exports = mongoose.model("User", UserSchema);
