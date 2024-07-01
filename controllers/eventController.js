const Event = require('../models/event')
const User = require('../models/user')

exports.getEvents = async (req, res, next) => {
    try {
        const events = await Event.find();

        if (events.length === 0) {
            const error = new Error('No Events are currently available')
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Events Found Successfully',
            events: events,
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getEvent = async (req, res, next) => {
    const eventId = req.params.eventId;

    try {
        const event = await Event.findById(eventId)
        if (!event) {
            const error = new Error('could not find event.')
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Event Found Successfully',
            event: event,
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.createEvent = async (req, res, next) => {
    const {title, description, date, location, category} = req.body;
    console.log(req.user);

    const user = await User.findOne({email: req.user.email});


    try {
        if(!req.file) {
            const error = new Error('No image provided');
            error.statusCode = 422;
            throw error;
        }

        const imageUrl = req.file.path.replace("\\", "/");
        const event = new Event({
            title,
            description,
            date,
            location,
            category,
            image: imageUrl,
            organizer: user._id,
        });

        const createdEvent = await event.save();

        const creator = await User.findById(user._id);
        creator.organizedEvents.push(createdEvent);

        res.status(201).json({
            message: 'Event created',
            event: createdEvent,
            creator: {id: creator._id, name: creator.name},});

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.updateEvent = async (req, res, next) => {
    const eventId = req.params.eventId;
    const {title, description, date, location, category} = req.body;
    try {
        const event = await Event.findById(eventId);

        if (!event) {
            const error = new Error("event was not found");
            error.statusCode = 404;
            throw error;
        }
        event.title = title;
        event.description = description;
        event.date = date;
        event.location = location;
        event.category = category;
        const updatedEvent = await event.save();
        res.status(200).json({message: 'Event updated', event: updatedEvent});

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteEvent = async (req, res, next) => {
    const eventId = req.params.eventId;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            const error = new Error("event was not found");
            error.statusCode = 404;
            throw error;
        }
        event.findByIdAndDelete(eventId);
        res.status(200).json({message: 'Event deleted', event: event});

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}