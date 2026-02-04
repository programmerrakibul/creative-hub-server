const express = require("express");
const {
  createTestimonial,
  getAllTestimonials,
  deleteTestimonial,
} = require("../controllers/testimonialController");
const { validateID } = require("../validators/validateID");

const testimonialRouter = express.Router();

testimonialRouter.get("/", getAllTestimonials);

testimonialRouter.post("/", createTestimonial);

testimonialRouter.delete("/:id", validateID, deleteTestimonial);

module.exports = { testimonialRouter };
