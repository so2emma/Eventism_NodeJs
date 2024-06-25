const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()

const port = 8080;
const app = express();

// Location of the routes
const authRoutes = require('./routes/authRoutes.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/index', (req, res) => {
    console.log('This is hitting the routes')
})
app.use('/auth', authRoutes);

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
    .then(() => console.log('Connected!'));

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
