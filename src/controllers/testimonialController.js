const Testimonial = require("../models/Testimonial");
const { appError } = require("../utils/appError");

// Create testimonial
const createTestimonial = async (req, res, next) => {
  try {
    const {
      clientName,
      position = "",
      company = "",
      content,
      location,
      country,
      imageUrl,
    } = req.body;

    const testimonial = await Testimonial.create({
      clientName,
      position,
      company,
      content,
      location,
      country,
      imageUrl,
    });

    res.send({
      success: true,
      message: "Testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

// Get all testimonials
const getAllTestimonials = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      country,
      sort = "-createdAt",
    } = req.query;

    const query = {};

    // Apply filter
    if (country) query.country = country;
    if (search) {
      query.$or = [
        { clientName: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort,
      select: "-__v",
    };

    const testimonials = await Testimonial.paginate(query, options);

    res.send({
      success: true,
      data: testimonials.docs,
      pagination: {
        total: testimonials.totalDocs,
        limit: testimonials.limit,
        page: testimonials.page,
        pages: testimonials.totalPages,
        hasNext: testimonials.hasNextPage,
        hasPrev: testimonials.hasPrevPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update testimonial by id
const updateTestimonial = async (req, res, next) => {
  try {
    const updates = req.body;

    if (Object.keys(updates || {}).length === 0) {
      const err = appError("At least one updated value must provide!", 400);
      return next(err);
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true },
    );

    if (!testimonial) {
      const err = appError("Testimonial not found", 404);
      return next(err);
    }

    res.send({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

// Delete testimonial by id
const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      const err = appError("Testimonial not found", 404);
      return next(err);
    }

    res.send({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
