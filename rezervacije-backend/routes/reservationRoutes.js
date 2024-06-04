const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/', reservationController.createReservation);
router.get('/event/:eventId', reservationController.getReservationsByEvent);
router.get('/export/:eventId', reservationController.exportReservations);
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
