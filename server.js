const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// ENVIROMENT VARIABLES
dotenv.config({ path: './config/config.env' });

// INIT Express App
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Morgan to log reqs
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));
