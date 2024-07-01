const express = require('express');
const {getEvents, getEvent, createEvent, updateEvent, deleteEvent} = require("../controllers/eventController");
const {eventValidation} = require("./validators/eventValidation");
const {validateAuthenticated, authorizeRole} = require("../middleware/authMiddleware");
const router = express.Router();


//this is the Get all Route
router.get('/events', getEvents)

//this is the get single
router.get('/event/:eventId', getEvent)

// this is the creation route
router.post('/event', eventValidation(), validateAuthenticated(), authorizeRole('admin', "organizer"), createEvent)

// this is the update route
router.put('/event/eventId', eventValidation(), validateAuthenticated(), authorizeRole('admin', "organizer"),updateEvent)

//this is the delete route
router.delete('/event/:eventId',validateAuthenticated(), authorizeRole('admin', "organizer"), deleteEvent)

module.exports = router;


