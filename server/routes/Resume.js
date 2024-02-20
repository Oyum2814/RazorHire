const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");
const ResumeTemplate = require("../models/resumeTemplate");
const Resume = require("../models/Resume");

// @desc    Get user's projects with resume template details
// @route   GET /projects/myProjects
router.get("/myProjects", ensureAuth, async (req, res) => {
  try {
    // Find the user by ID and populate the MyProjects field with resume template details
    const user = await User.findById(req.user._id)
      .populate({
        path: "MyProjects",
        populate: {
          path: "ResumeTemplateId",
          select: "_id Title ImageLink",
        },
      })
      .lean();

    console.log(user);
    // Check if user has projects
    if (!user.MyProjects) {
      return res.status(404).json({ error: "No projects found for this user" });
    }

    // Extract resume template details from the populated MyProjects field
    const projects = user.MyProjects.map((project) => ({
      Content: project.Content ? project.Content._id : null,
      Title: project.Title ? project.Title : null,
      ImageLink: project.ResumeTemplateId
        ? project.ResumeTemplateId.ImageLink
        : null,
    }));

    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

/*
router.get('/makeResumeTemplate' ,async (req, res) => {
  try {
    // Create a new document (dummy entry)
    const newResumeTemplate = new ResumeTemplate({
      Title: 'Dummy Template 2',
      filename: 'dummy_template2.pdf',
      Subscription: 'free',
      ImageLink: 'https://example.com/dummy_image.jpg',
    });

    // Save the new document to the database
    const savedTemplate = await newResumeTemplate.save();
    console.log('Dummy entry created:', savedTemplate);
  } catch (error) {
    console.error('Error creating dummy entry:', error);
  }
});
*/

// @desc    Get resume template file by ID
// @route   GET /resumeTemplate/:id
router.get("/resumeTemplate/:id", ensureAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Find the resume template by ID
    const resumeTemplate = await ResumeTemplate.findById(id);

    if (!resumeTemplate) {
      return res.status(404).json({ error: "Resume template not found" });
    }

    // Get the filename of the resume template
    const { filename } = resumeTemplate;

    // Construct the file path
    const filePath = path.join(__dirname, "..", "resume-templates", filename);

    console.log(filePath);
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Resume template file not found" });
    }

    // Read the file data
    const fileData = fs.readFileSync(filePath, "utf8");

    // Send the file data as a response
    res.send(fileData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

//Endpoint to get all the templates with Title, ImageLink [for thumbnail] and _id [for reference]
router.get("/resume-templates", async (req, res) => {
  try {
    // Fetch all resume templates from the database, including Title, ImageLink, and _id
    const resumeTemplates = await ResumeTemplate.find(
      {},
      "_id Title ImageLink"
    ).lean();

    res.json(resumeTemplates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

//Add project, with the selected template, empty content [Type Resume] and userId
router.post("/add", ensureAuth, async (req, res) => {
  try {
    const { ResumeTemplateId, Title } = req.body;

    // Check if the resume template exists
    const templateExists = await ResumeTemplate.exists({
      _id: ResumeTemplateId,
    });
    if (!templateExists) {
      return res.status(400).json({ error: "Invalid Resume Template ID" });
    }

    // Create a new empty resume
    const newResume = new Resume({ owner: req.user._id });

    // Save the new resume
    const savedResume = await newResume.save();

    // Create the project object with the new resume ID
    const project = {
      ResumeTemplateId,
      Content: savedResume._id, // Store the ID of the newly created resume
      userId: req.user._id,
      Title, // Include the Title field
    };

    // Add the project to the user's projects array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { MyProjects: project },
    });

    res.json({ message: "Project added successfully", data: project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Edit the content of a project with the ResumeId [Not the ResumeTemplateID]
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    const { id } = req.params;
    // Find the resume by ID
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    // Check if the user is the owner of the resume
    if (resume.owner.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "Not authorized to update this resume" });
    }
    // Update individual properties of the resume
    if (req.body.firstName) {
      resume.firstName = req.body.firstName;
    }
    if (req.body.middleName) {
      resume.middleName = req.body.middleName;
    }
    if (req.body.lastName) {
      resume.lastName = req.body.lastName;
    }
    if (req.body.designation) {
      resume.designation = req.body.designation;
    }
    if (req.body.phone) {
      resume.phone = req.body.phone;
    }
    if (req.body.summary) {
      resume.summary = req.body.summary;
    }
    if (req.body.experiences) {
      resume.experiences = req.body.experiences;
    }
    if (req.body.educations) {
      resume.educations = req.body.educations;
    }
    if (req.body.skills) {
      resume.skills = req.body.skills;
    }
    if (req.body.achievements) {
      resume.achievements = req.body.achievements;
    }
    if (req.body.projects) {
      resume.projects = req.body.projects;
    }
    if (req.body.address) {
      resume.address = req.body.address;
    }
    if (req.body.socials) {
      resume.socials = req.body.socials;
    }

    // Save the updated resume
    await resume.save();
    res.json(resume); // Return the updated resume
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/:id", ensureAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Find the resume by ID
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    // Check if the user querying the resume is the owner
    if (resume.owner.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "Not authorized to access this resume" });
    }

    // If the user is the owner, return the resume
    res.json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
