const express = require("express");
const {
  createTeamMember,
  getAllTeamMember,
  deleteTeamMember,
  updateTeamMember,
} = require("../controllers/teamController");
const { validateID } = require("../validators/validateID");

const teamRouter = express.Router();

teamRouter.get("/", getAllTeamMember);

teamRouter.post("/", createTeamMember);

teamRouter.put("/:id", validateID, updateTeamMember);

teamRouter.delete("/:id", validateID, deleteTeamMember);

module.exports = { teamRouter };
