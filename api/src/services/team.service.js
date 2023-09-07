const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Team, Player } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a team
 * @param {Object} teamBody
 * @returns {Promise<Team>}
 */
const createTeam = async (teamBody) => {
  const teamMembers = [];
  for(const player of teamBody.players) {
    const p = await Player.create(player);
    teamMembers.push(p._id)
  }
  const data = teamBody;
  delete data.players;
  data.teamMembers = teamMembers;

  const team = Team.create(teamBody);

  await Player.updateMany(
    {
      _id: {
        $in: teamMembers,
      },
    },
    {
      team_id: team._id,
    }
  );
  return team;
};

/**
 * Query for teams
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTeams = async (filter, options) => {
  const teams = await Team.paginate(filter, options);
  return teams;
};

/**
 * Get team by id
 * @param {ObjectId} id
 * @returns {Promise<Team>}
 */
const getTeamById = async (id) => {
  return Team.findById(id);
};

/**
 * Update team by id
 * @param {ObjectId} teamId
 * @param {Object} updateBody
 * @returns {Promise<Team>}
 */
const updateTeamById = async (teamId, updateBody) => {
  const team = await getTeamById(teamId);
  if (!team) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
  }
  if (updateBody.teamMembers) {
    await Player.updateMany(
      {
        _id: {
          $in: updateBody.teamMembers.map((t) => mongoose.Types.ObjectId(t)),
        },
      },
      {
        team_id: team._id,
      }
    );
  }
  Object.assign(team, updateBody);
  await team.save();
  return team;
};

/**
 * Delete team by id
 * @param {ObjectId} teamId
 * @returns {Promise<Team>}
 */
const deleteTeamById = async (teamId) => {
  const team = await getTeamById(teamId);
  if (!team) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
  }
  await team.remove();
  return team;
};

module.exports = {
  createTeam,
  queryTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
};
