const express = require('express');
const {getEvents, getEvent, createEvent, updateEvent, deleteEvent} = require("../controllers/eventController");
const {eventValidation} = require("./validators/eventValidation");
const router = express.Router();


//this is the Get all Route
router.get('/events', getEvents)

//this is the get single
router.get('/create/:eventId', getEvent)

// this is the creation route
router.post('/event', eventValidation(), createEvent)

// this is the update route
router.put('/event/eventId', eventValidation(), updateEvent)

//this is the delete route
router.delete('/event/:eventId', deleteEvent)

module.exports = router;


