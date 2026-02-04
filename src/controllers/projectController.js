const Project = require("../models/Project");
const { appError } = require("../utils/appError");

// Get all projects with filters
const getAllProjects = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      status = "active",
      featured,
      search,
      sort = "-createdAt",
    } = req.query;

    const query = { status };

    // Apply filters
    if (category) query.category = category;
    if (featured !== undefined) query.featured = featured === "true";
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort,
      select: "-__v",
    };

    const projects = await Project.paginate(query, options);

    res.send({
      success: true,
      data: projects.docs,
      pagination: {
        total: projects.totalDocs,
        limit: projects.limit,
        page: projects.page,
        pages: projects.totalPages,
        hasNext: projects.hasNextPage,
        hasPrev: projects.hasPrevPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

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

// Update project
const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id?.trim() || id.length !== 24) {
      const err = appError("Invalid project ID", 400);
      return next(err);
    }

    if (Object.keys(updates || {}).length === 0) {
      const err = appError("At least one updated value must provide!", 400);
      return next(err);
    }

    // Handle technologies array
    if (typeof updates?.technologies === "string") {
      updates.technologies = updates.technologies
        .split(",")
        .map((t) => t.trim());
    }

    const project = await Project.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      const err = appError("Project not found", 404);
      return next(err);
    }

    res.send({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// Delete project by id
const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id?.trim() || id.length !== 24) {
      const err = appError("Invalid project ID", 400);
      return next(err);
    }

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      const err = appError("Project not found", 404);
      return next(err);
    }

    res.send({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
};
