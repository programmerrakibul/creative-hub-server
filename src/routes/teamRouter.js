const express = require("express");
const {
  createTeamMember,
  getAllTeamMember,
  deleteTeamMember,
} = require("../controllers/teamController");
const { validateID } = require("../validators/validateID");

const teamRouter = express.Router();

teamRouter.get("/", getAllTeamMember);

teamRouter.post("/", createTeamMember);

teamRouter.delete("/:id", validateID, deleteTeamMember);

module.exports = { teamRouter };
