const express = require("express");
const {
  createProject,
  getAllProjects,
  deleteProject,
  updateProject,
} = require("../controllers/projectController");
const { validateID } = require("../validators/validateID");

const projectRouter = express.Router();

projectRouter.get("/", getAllProjects);

projectRouter.post("/", createProject);

projectRouter.put("/:id", validateID, updateProject);

projectRouter.delete("/:id", validateID, deleteProject);

module.exports = { projectRouter };
