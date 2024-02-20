const mongoose = require("mongoose");

// Define sub-schemas for nested fields
const experienceSchema = new mongoose.Schema({
  title: String,
  organization: String,
  location: String,
  startDate: String, // Change type to Date
  endDate: String,
  description: String,
});

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  city: String,
  school: String,
  description: String,
  graduationDate: String, // Change type to Date
});

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const codingProfileSchema = new mongoose.Schema({
  platform: String,
  username: String,
  link: String,
});

// Define the main schema
const resumeSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  email: String,
  designation: String,
  address: String,
  summary: String,
  phone: String,
  experiences: [experienceSchema], // Array of experience objects
  educations: [educationSchema], // Array of education objects
  skills: [String], // Array of strings (skills)
  achievements: [String], // Array of strings (achievements)
  projects: [projectSchema], // Array of project objects
  socials: [codingProfileSchema], // Array of coding profile objects
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
});

// Create a model based on the schema
const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
