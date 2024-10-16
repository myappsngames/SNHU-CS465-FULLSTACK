const express = require('express'); // Express app
const router = express.Router(); // Express router logic
const {expressjwt: jwt} = require('express-jwt');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ["HS256"]
});

const authController = require('../controllers/authentication');
// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');

router
    .route('/login')
    .post(authController.login); // POST Method routes login

router
    .route('/register')
    .post(authController.register); // POST Method routes register

// define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(auth, tripsController.tripsAddTrip); // POST Method Adds a Trip (authentication middleware injection)

// GET Method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) // GET Method routes tripFindByCode
    .put(auth, tripsController.tripsUpdateTrip); // PUT Method routes tripUpdateTrip (authentication middleware injection)

module.exports = router;