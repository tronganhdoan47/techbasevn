const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const mainRouter = require('./routes/main');

app.set('view engine', 'ejs');
// Middlewares
app.use(helmet());
app.use(express.json({ limit: '300kb' }));
app.use(express.urlencoded({ extended: false, limit: '300kb' }));

app.use('/api/', mainRouter);

app.use((req, res) => {
    res.status(404).json({ status: 404, message: 'API not found' });
});

// Connect MongoDB
// Because this is a test. So I put MONGO_URI in .env.example instead .env
// To let you know MongoDb connection string.
// Change .env.example into .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to DB'))
    .catch((err) => {
        console.log(err);
    });

app.listen(PORT);
