const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { playerService } = require('../services');

const createPlayer = catchAsync(async (req, res) => {
  const player = await playerService.createPlayer(req.body);
  res.status(httpStatus.CREATED).send(player);
});

const getPlayers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['firstname', 'lastname', 'email']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await playerService.queryPlayers(filter, options);
  res.send(result);
});

const getPlayer = catchAsync(async (req, res) => {
  const player = await playerService.getPlayerById(req.params.playerId);
  if (!player) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Player not found');
  }
  res.send(player);
});

const updatePlayer = catchAsync(async (req, res) => {
  const player = await playerService.updatePlayerById(req.params.playerId, req.body);
  res.send(player);
});

const deletePlayer = catchAsync(async (req, res) => {
  await playerService.deletePlayerById(req.params.playerId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPlayer,
  getPlayers,
  getPlayer,
  updatePlayer,
  deletePlayer,
};
