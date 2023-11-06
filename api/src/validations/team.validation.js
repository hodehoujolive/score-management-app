const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTeam = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    players: Joi.array().items(Joi.object().keys({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().required(),
    })),
  }),
};

const getTeams = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTeam = {
  params: Joi.object().keys({
    teamId: Joi.string().custom(objectId),
  }),
};

const updateTeam = {
  params: Joi.object().keys({
    teamId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      teamMembers: Joi.array().items(Joi.string().custom(objectId)),
    })
    .min(1),
};

const deleteTeam = {
  params: Joi.object().keys({
    teamId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
};
