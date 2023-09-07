const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const teamValidation = require('../../validations/team.validation');
const teamController = require('../../controllers/team.controller');

const router = express.Router();

router
  .route('/')
  // .post(auth('manageTeams'), validate(teamValidation.createTeam), teamController.createTeam)
  .post(validate(teamValidation.createTeam), teamController.createTeam)
  // .get(auth('getTeams'), validate(teamValidation.getTeams), teamController.getTeams);
  .get(validate(teamValidation.getTeams), teamController.getTeams);


router
  .route('/leaderboard')
  .get(teamController.leaderboard);

router
  .route('/:teamId')
  .get(auth('getTeams'), validate(teamValidation.getTeam), teamController.getTeam)
  .patch(auth('manageTeams'), validate(teamValidation.updateTeam), teamController.updateTeam)
  .delete(auth('manageTeams'), validate(teamValidation.deleteTeam), teamController.deleteTeam);

module.exports = router;
