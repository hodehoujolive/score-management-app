const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Match, Team } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a match
 * @param {Object} matchBody
 * @returns {Promise<Match>}
 */
const createMatch = async (matchBody) => {
  const match = await Match.create(matchBody);
  
  if(Number(matchBody.hostGoals) === Number(matchBody.guestGoals)) {
    await Team.updateMany({
      _id: {
        $in: [mongoose.Types.ObjectId(matchBody.host), mongoose.Types.ObjectId(matchBody.guest)]
      }
    }, {
      $inc: {
        points: 1
      }
    })
  } else if (Number(matchBody.hostGoals) > Number(matchBody.guestGoals)) {
    await Team.updateOne({
      _id: mongoose.Types.ObjectId(matchBody.host)
    }, {
      $inc: {
        points: 3
      }
    })
  } else {
    await Team.updateOne({
      _id: mongoose.Types.ObjectId(matchBody.guest)
    }, {
      $inc: {
        points: 3
      }
    })
  }

  return match;
};

/**
 * Query for matchs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMatchs = async (filter, options) => {
  options.populate = 'guest.Team,host.Team';
  if(filter.teamId && filter.teamId.length) {
    filter['$or'] = [{
      guest: mongoose.Types.ObjectId(filter.teamId)
    }, {
      host: mongoose.Types.ObjectId(filter.teamId)
    }];
    delete filter.teamId;
  }
  console.log(filter, options)
  const matchs = await Match.paginate(filter, options);
  return matchs;
};

/**
 * Get match by id
 * @param {ObjectId} id
 * @returns {Promise<Match>}
 */
const getMatchById = async (id) => {
  return Match.findById(id);
};

/**
 * Update match by id
 * @param {ObjectId} matchId
 * @param {Object} updateBody
 * @returns {Promise<Match>}
 */
const updateMatchById = async (matchId, updateBody) => {
  const match = await getMatchById(matchId);
  if (!match) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Match not found');
  }
  Object.assign(match, updateBody);
  await match.save();
  return match;
};

/**
 * Delete match by id
 * @param {ObjectId} matchId
 * @returns {Promise<Match>}
 */
const deleteMatchById = async (matchId) => {
  const match = await getMatchById(matchId);
  if (!match) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Match not found');
  }
  await match.remove();
  return match;
};

module.exports = {
  createMatch,
  queryMatchs,
  getMatchById,
  updateMatchById,
  deleteMatchById,
};
