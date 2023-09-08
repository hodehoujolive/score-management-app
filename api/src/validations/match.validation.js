const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMatch = {
  body: Joi.object().keys({
    host: Joi.string().custom(objectId),
    guest: Joi.string().custom(objectId),
    hostGoals: Joi.number().integer(),
    guestGoals: Joi.number().integer(),
  }),
};

const getMatchs = {
  query: Joi.object().keys({
    host: Joi.string().custom(objectId),
    guest: Joi.string().custom(objectId),
    teamId: Joi.string().custom(objectId),
    hostGoals: Joi.number().integer(),
    guestGoals: Joi.number().integer(),
    matchDate: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMatch = {
  params: Joi.object().keys({
    matchId: Joi.string().custom(objectId),
  }),
};

const updateMatch = {
  params: Joi.object().keys({
    matchId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      host: Joi.string().custom(objectId),
      guest: Joi.string().custom(objectId),
      hostGoals: Joi.number().integer(),
      guestGoals: Joi.number().integer(),
      matchDate: Joi.string(),
    })
    .min(1),
};

const deleteMatch = {
  params: Joi.object().keys({
    matchId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMatch,
  getMatchs,
  getMatch,
  updateMatch,
  deleteMatch,
};
