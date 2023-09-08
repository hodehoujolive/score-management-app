const httpStatus = require('http-status');
const { Player } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a player
 * @param {Object} playerBody
 * @returns {Promise<Player>}
 */
const createPlayer = async (playerBody) => {
  return Player.create(playerBody);
};

/**
 * Query for players
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPlayers = async (filter, options) => {
  const players = await Player.paginate(filter, options);
  return players;
};

/**
 * Get player by id
 * @param {ObjectId} id
 * @returns {Promise<Player>}
 */
const getPlayerById = async (id) => {
  return Player.findById(id);
};

/**
 * Get player by email
 * @param {string} email
 * @returns {Promise<Player>}
 */
const getPlayerByEmail = async (email) => {
  return Player.findOne({ email });
};

/**
 * Update player by id
 * @param {ObjectId} playerId
 * @param {Object} updateBody
 * @returns {Promise<Player>}
 */
const updatePlayerById = async (playerId, updateBody) => {
  const player = await getPlayerById(playerId);
  if (!player) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Player not found');
  }
  Object.assign(player, updateBody);
  await player.save();
  return player;
};

/**
 * Delete player by id
 * @param {ObjectId} playerId
 * @returns {Promise<Player>}
 */
const deletePlayerById = async (playerId) => {
  const player = await getPlayerById(playerId);
  if (!player) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Player not found');
  }
  await player.remove();
  return player;
};

module.exports = {
  createPlayer,
  queryPlayers,
  getPlayerById,
  getPlayerByEmail,
  updatePlayerById,
  deletePlayerById,
};
