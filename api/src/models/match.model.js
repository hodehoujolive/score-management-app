const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const matchSchema = mongoose.Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Team'
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Team'
    },
    hostGoals: {
      type: Number,
      default: 0,
    },
    guestGoals: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


// add plugin that converts mongoose to json
matchSchema.plugin(toJSON);
matchSchema.plugin(paginate);

/**
 * @typedef Match
 */
const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
