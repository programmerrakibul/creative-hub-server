const Team = require("../models/Team");

// Create team member
const createTeamMember = async (req, res, next) => {
  try {
    const teamMember = await Team.create(req.body);

    res.send({
      success: true,
      message: "Team member created successfully",
      data: teamMember,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTeamMember };
