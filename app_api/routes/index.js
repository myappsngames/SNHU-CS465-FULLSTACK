const express = require('express'); // Express app
const router = express.Router(); // Express router logic

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');

// define route for our trips endpoint
router.get('/trips', tripsController.tripsList); // GET Method routes tripList

// define route for our trips/:tripCode endpoint
router.get('/trips/:tripCode', tripsController.tripsFindByCode); // GET Method routes tripsFindByCode - requires parameter

module.exports = router;