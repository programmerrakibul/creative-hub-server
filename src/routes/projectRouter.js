const express = require("express");
const {
  createProject,
  getAllProjects,
  deleteProject,
} = require("../controllers/projectController");

const projectRouter = express.Router();

projectRouter.get("/", getAllProjects);

projectRouter.post("/", createProject);

projectRouter.delete("/:id", deleteProject);

module.exports = { projectRouter };
