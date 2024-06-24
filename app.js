const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()

const port = 8080;
const app = express();

app.use(express.json());    
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// getting them from our .env
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.cfzpikg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('Connected!'));

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
