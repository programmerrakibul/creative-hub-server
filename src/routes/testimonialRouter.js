const express = require("express");
const { createTestimonial } = require("../controllers/testimonialController");

const testimonialRouter = express.Router();

testimonialRouter.post("/", createTestimonial);

module.exports = { testimonialRouter };
