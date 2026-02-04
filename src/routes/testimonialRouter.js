const express = require("express");
const {
  createTestimonial,
  getAllTestimonials,
} = require("../controllers/testimonialController");

const testimonialRouter = express.Router();

testimonialRouter.get("/", getAllTestimonials);

testimonialRouter.post("/", createTestimonial);

module.exports = { testimonialRouter };
