const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const matchValidation = require('../../validations/match.validation');
const matchController = require('../../controllers/match.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageMatchs'), validate(matchValidation.createMatch), matchController.createMatch)
  .get(auth('getMatchs'), validate(matchValidation.getMatchs), matchController.getMatchs);

router
  .route('/:matchId')
  .get(auth('getMatchs'), validate(matchValidation.getMatch), matchController.getMatch)
  .patch(auth('manageMatchs'), validate(matchValidation.updateMatch), matchController.updateMatch)
  .delete(auth('manageMatchs'), validate(matchValidation.deleteMatch), matchController.deleteMatch);

module.exports = router;
