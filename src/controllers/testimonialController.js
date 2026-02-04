const Testimonial = require("../models/Testimonial");

// Create testimonial
const createTestimonial = async (req, res, next) => {
  try {
    const {
      clientName,
      position,
      company,
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

module.exports = { createTestimonial };
