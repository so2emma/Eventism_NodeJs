const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    type: { type: String, required: true },
    price: { type: Number, required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},{timestamps: true})

module.exports = mongoose.model('Ticket', ticketSchema);