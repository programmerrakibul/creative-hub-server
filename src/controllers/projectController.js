const Project = require("../models/Project");

// Create project
const createProject = async (req, res, next) => {
  try {
    const {
      title,
      description,
      projectUrl,
      clientCountry,
      technologies,
      category,
      featured,
      imageUrl,
      status,
    } = req.body;

    const project = await Project.create({
      title,
      description,
      projectUrl,
      clientCountry,
      technologies: technologies
        ? technologies.split(",").map((t) => t.trim())
        : [],
      category,
      featured: featured || false,
      imageUrl,
      status,
    });

    res.status(201).send({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createProject };
