const express = require("express");
const { createProject } = require("../controllers/projectController");

const projectRouter = express.Router();

projectRouter.post("/", createProject);

module.exports = { projectRouter };
