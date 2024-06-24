const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    category: { type: String },
    image: { type: String },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
}, {timestamps: true});

module.exports = mongoose.model('Event', eventSchema);
