const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPlayer = {
  body: Joi.object().keys({
    lastname: Joi.string().required(),
    firstname: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
};

const getPlayers = {
  query: Joi.object().keys({
    lastname: Joi.string(),
    firstname: Joi.string(),
    email: Joi.string().email(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPlayer = {
  params: Joi.object().keys({
    playerId: Joi.string().custom(objectId),
  }),
};

const updatePlayer = {
  params: Joi.object().keys({
    playerId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      lastname: Joi.string(),
      firstname: Joi.string(),
      email: Joi.string().email(),
    })
    .min(1),
};

const deletePlayer = {
  params: Joi.object().keys({
    playerId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPlayer,
  getPlayers,
  getPlayer,
  updatePlayer,
  deletePlayer,
};
