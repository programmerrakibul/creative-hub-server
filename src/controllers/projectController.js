const Project = require("../models/Project");

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

module.exports = { getAllProjects, createProject };
