const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const playerValidation = require('../../validations/player.validation');
const playerController = require('../../controllers/player.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('managePlayers'), validate(playerValidation.createPlayer), playerController.createPlayer)
  .get(auth('getPlayers'), validate(playerValidation.getPlayers), playerController.getPlayers);

router
  .route('/:playerId')
  .get(auth('getPlayers'), validate(playerValidation.getPlayer), playerController.getPlayer)
  .patch(auth('managePlayers'), validate(playerValidation.updatePlayer), playerController.updatePlayer)
  .delete(auth('managePlayers'), validate(playerValidation.deletePlayer), playerController.deletePlayer);

module.exports = router;
