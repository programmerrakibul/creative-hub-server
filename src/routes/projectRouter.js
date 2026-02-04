const express = require("express");
const {
  createProject,
  getAllProjects,
} = require("../controllers/projectController");

const projectRouter = express.Router();

projectRouter.get("/", getAllProjects);

projectRouter.post("/", createProject);

module.exports = { projectRouter };
