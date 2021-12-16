const express = require('express');
const connectDB = require('./config/db'); // Mongoose configs

// Utils
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');

// Passport
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

// Security
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const xss = require('xss-clean');

// ENVIROMENT VARIABLES
dotenv.config({ path: './config/config.env' });

// Init Express App
const app = express();
const server = require('http').createServer(app);

//Connect to DB
connectDB();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- Utils ----------

// Use Morgan to log reqs
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// compress all responses
app.use(compression());

// ---------- Security ----------

// Sanitize data
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Set security header
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

// Enable CORS
app.use(
  cors({
    origin: 'https://chattweb.herokuapp.com/',
    credentials: true,
  }),
);

// ---------- Passport Middleware and Set Up ----------

// Set up express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
      url: process.env.MONGO_URI,
      collection: 'sessions',
      mongooseConnection: mongoose.connection,
    }),
  }),
);

// initialize cookieParser middleware
app.use(cookieParser(process.env.SESSION_SECRET));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passportConfig')(passport);

// ---------- Routes ----------

//Routes
const auth = require('./routes/auth');
const chat = require('./routes/chat');
const room = require('./routes/room');
//Mount Routes
app.use('/api/auth', auth);
app.use('/api/chat', chat);
app.use('/api/room', room);

//Serve static assets in production
// Set static folder
app.use(express.static(__dirname + '/client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));

const { run } = require('./utils/socketFunctionality');

run();
