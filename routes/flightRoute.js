const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.post('/api/flights',controller.continue, controller.createFlight)
router.get('/api/flights', controller.getFlights);
router.get('/api/flights/:id', controller.getFlight);
router.put('/api/flights/:id', controller.updateFlight);
router.delete('/api/flights/:id', controller.deleteFlight);

module.exports = router;
