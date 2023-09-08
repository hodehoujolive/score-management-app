const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const teamRoute = require('./team.route');
const matchRoute = require('./match.route');
const playerRoute = require('./player.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/matchs',
    route: matchRoute,
  },
  {
    path: '/players',
    route: playerRoute,
  },
  {
    path: '/teams',
    route: teamRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
