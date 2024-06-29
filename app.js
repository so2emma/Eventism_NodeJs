const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()

const port = 8080;
const app = express();

// Location of the routes
const authRoutes = require('./routes/authRoutes.js');
const eventRoutes = require('./routes/eventRoutes.js');
const ticketRoutes = require('./routes/ticketRoutes.js');
const {validateAuthenticated, authorizeRole} = require("./middleware/authMiddleware");


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/index', (req, res) => {
    console.log('This is hitting the routes')
})

app.use('/auth', authRoutes);
app.use('/organized', eventRoutes);
app.use('/events', ticketRoutes);


//this is for testing the validation for authenticated routes
app.use('/validate', validateAuthenticated(), authorizeRole('admin'), (req, res) => {
    console.log('The user has been authenticated');
    res.send('User authenticated and authorized');
})


// this route is for error handling
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});


// getting them from our .env
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.cfzpikg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Failed to connect to MongoDB', err));


app.listen(port, (err) => {
    if (err) {
        console.error('Failed to start server:', err);
    } else {
        console.log(`Server is running on port http://localhost:${port}`);
    }
});
