const express = require("express");
const { createTeamMember } = require("../controllers/teamController");

const teamRouter = express.Router();

teamRouter.post("/", createTeamMember);

module.exports = { teamRouter };
