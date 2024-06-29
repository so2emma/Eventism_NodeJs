const express = require('express');
const {getTickets, getTicket, createTicket, updateTicket, deleteTicket} = require("../controllers/ticketController");

const router = express.Router();


router.get('/tickets', getTickets);

router.get('/tickets/:id', getTicket);

router.post('/ticket', createTicket);

router.put('/ticket/:ticketId', updateTicket);

router.delete('/ticket/:ticketId', deleteTicket);





