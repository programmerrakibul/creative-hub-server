const express = require("express");
const {
  createTeamMember,
  getAllTeamMember,
} = require("../controllers/teamController");

const teamRouter = express.Router();

teamRouter.get("/", getAllTeamMember);

teamRouter.post("/", createTeamMember);

module.exports = { teamRouter };
