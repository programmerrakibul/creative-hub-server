const Team = require("../models/Team");
const { appError } = require("../utils/appError");

// Get all testimonials
const getAllTeamMember = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, sort = "-createdAt" } = req.query;

    const query = {};

    // Apply filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { bio: { $regex: search, $options: "i" } },
      ];
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort,
      select: "-__v",
    };

    const teamMembers = await Team.paginate(query, options);

    res.send({
      success: true,
      data: teamMembers.docs,
      pagination: {
        total: teamMembers.totalDocs,
        limit: teamMembers.limit,
        page: teamMembers.page,
        pages: teamMembers.totalPages,
        hasNext: teamMembers.hasNextPage,
        hasPrev: teamMembers.hasPrevPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Create team member
const createTeamMember = async (req, res, next) => {
  try {
    const teamMember = await Team.create(req.body);

    res.send({
      success: true,
      message: "Team member created successfully",
      data: teamMember,
    });
  } catch (error) {
    next(error);
  }
};

// Delete team member by id
const deleteTeamMember = async (req, res, next) => {
  try {
    const testimonial = await Team.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      const err = appError("Team member not found", 404);
      return next(err);
    }

    res.send({
      success: true,
      message: "Team member deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTeamMember, createTeamMember, deleteTeamMember };
