const express = require("express");
const {
  createProject,
  getAllProjects,
  deleteProject,
  updateProject,
} = require("../controllers/projectController");

const projectRouter = express.Router();

projectRouter.get("/", getAllProjects);

projectRouter.post("/", createProject);

projectRouter.put("/:id", updateProject);

projectRouter.delete("/:id", deleteProject);

module.exports = { projectRouter };
