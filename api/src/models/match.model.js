const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const matchSchema = mongoose.Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    hostGoals: {
      type: Number,
      default: 0,
    },
    guestGoals: {
      type: Number,
      default: 0,
    },
    matchDate: {
      type: Date,
      default: null,
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
