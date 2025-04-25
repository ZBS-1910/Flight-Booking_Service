const express = require('express');
const router = express.Router();
const {InfoController}=require('../../controllers');
const bookingRoutes = require('./booking-routes');  // Make sure this path is correct


router.get('/info', InfoController.info); // Example route for getting info
// Register the booking routes under '/bookings' endpoint
router.use('/bookings', bookingRoutes);

module.exports = router;
 