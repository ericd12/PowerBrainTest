const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/powerbrain', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
});

const connection = mongoose.connection;
connection.once('open',() => {
    console.log("db connection created successfully");
});

const elementsRouter = require('./routes/elements');
const tracksRouter = require('./routes/tracks');
const programsRouter = require('./routes/programs');
const formatsRouter = require('./routes/formats');
const catsRouter = require('./routes/category');

app.use('/elements', elementsRouter);
app.use('/tracks', tracksRouter);
app.use('/programs', programsRouter);
app.use('/formats', formatsRouter);
app.use('/categories', catsRouter);

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});