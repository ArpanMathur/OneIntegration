var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var app = express();

app.enable('trust proxy');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));

/**
 * Define paths to serve static resources
 * defaults to public the rest of the two
 * are custom defined
 * */
app.use(express.static(path.join(__dirname, "public")));
app.use("/apps",express.static(path.join(__dirname, "public")));
app.use("/bower/components", express.static(path.join(__dirname,"bower_components")));
app.use("/static/resources", express.static(path.join(__dirname,"views","templates")));
app.use("/angular/apps", express.static(path.join(__dirname,"scripts","apps")));
app.use("/angular/components", express.static(path.join(__dirname,"scripts","apps","components")));

/**
 * The app uses Passports authentication library
 * we have to explicitly provide a session scope
 * to it in-order to maintain session based tokens
 * */
app.use(session({
  proxy:true,
  secret:'passport',
  resave:true,
  saveUninitialized:true
}));

app.use(passport.initialize()); //Initialize passport connection the
app.use(passport.session()); //The app will register a passport session


/**Define express based routers for the app
 * this provides for segregation of the
 * central app to multiple mini-apps
 * */
var routes = require('./routes/index');
var users = require('./routes/users');
var ngContext = require('./routes/ngContext');
var quantumContext = require('./routes/quantumContext');
var authContext = require('./routes/authContext');
var saveCtx = require('./routes/saveCtx')
var profileCtx = require('./routes/profileCtx');

/**Defines request mappings and the required
 *handlers to be executed to serve the request
 * */
app.use('/', routes);
app.use('/users', users);
app.use('/apps',ngContext);
app.use('/apps/quantum',quantumContext);
app.use('/apps/quantum/auth',authContext);
app.use('/apps/quantum/save',saveCtx);
app.use('/apps/quantum/profile',profileCtx);

/**
 * What would happen if a file is not
 * inside the app root ??
 **/
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Define app settings to be development
 * just in case any other error occurs,
 * can't do this in production ... :P
 * */
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

/**
 * Internal server error for any stacktrace is not assigned
 * to the err, but this ain't not that great after all
 * there is error .. :P
 * */
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
