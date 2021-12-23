const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

// Initialise express app
const app = express();

// Middlewares
// HTML post form
app.use(express.urlencoded({ extended: false }));
// Parse json
app.use(express.json());
// Parse Cookies
app.use(cookieParser());
// Passport
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);

// Routes
const usersRoutes = require('./routes/api/users.routes.js');
app.use('/api/users', usersRoutes);

// DB config
const db = require('./config/keys').mongoURI;

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
