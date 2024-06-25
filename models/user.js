const mongoose = require('mongoose');
const Roles = require('../utils/roles');

const userSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true,},
    role: { type: String, enum: Object.values(Roles), default: Roles.ATTENDEE},
    organizedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    attendedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],

}, {timestamps: true});

module.exports = mongoose.model('User', userSchema)