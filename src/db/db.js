const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const routes = require('./router');

// connect to MongoDB
mongoose.connect('mongodb://localhost/quotes');
const db = mongoose.connection;

// handle mongo error
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
	console.log('we are connected');
});

// use sessions for tracking logins
app.use(
	session({
		secret: 'work hard',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({
			mongooseConnection: db
		})
	})
);

app.use(function(req, res, next) {
	// Website you wish to allow to connect
	res.header('Access-Control-Allow-Origin', 'http://localhost:8888');
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	// Request headers you wish to allow
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from template
app.use(express.static(__dirname + ''));

// include routes

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	const err = new Error('File not found');
	err.status = 400;
	next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send(err.message);
});

// listen on port 3000
app.listen(3000, () => {
	console.log('Express app listening on port 3000');
});
