const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session); // Notice the function call here
const connectDB = require("./config/db");
const cors = require("cors");
// Load config
if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: "./config/config_dev.env" });
}
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "./config/config_prod.env" });
}

// Passport config
require("./config/passport")(passport);

connectDB();

const allowedOrigin = "http://localhost:3000";
const app = express();
app.use(cors());

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes

app.use("/auth", require("./routes/auth"));
app.use("/resume", require("./routes/Resume"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
