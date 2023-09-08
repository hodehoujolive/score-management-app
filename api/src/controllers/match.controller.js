const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { matchService } = require('../services');

const createMatch = catchAsync(async (req, res) => {
  const match = await matchService.createMatch(req.body);
  res.status(httpStatus.CREATED).send(match);
});

const getMatchs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['teamId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await matchService.queryMatchs(filter, options);
  res.send(result);
});

const getMatch = catchAsync(async (req, res) => {
  const match = await matchService.getMatchById(req.params.matchId);
  if (!match) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Match not found');
  }
  res.send(match);
});

const updateMatch = catchAsync(async (req, res) => {
  const match = await matchService.updateMatchById(req.params.matchId, req.body);
  res.send(match);
});

const deleteMatch = catchAsync(async (req, res) => {
  await matchService.deleteMatchById(req.params.matchId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMatch,
  getMatchs,
  getMatch,
  updateMatch,
  deleteMatch,
};
