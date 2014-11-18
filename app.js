/**
 * Module dependencies.
 */

var express = require('express');
var setting = require('./setting');
var http = require('http');
var path = require('path');
var expressValidator = require('express-validator');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//var session = require('cookie-session');
var session = require('express-session');
var localize = require('./lang/' + setting.server.language);

var app = module.exports = express();
var server = http.createServer(app);

app.locals = localize;
app.set('env', 'development');
app.set('setting', setting);
app.set('port', setting.server.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser('chatroom'));
app.use(session({
    secret: 'what',
    resave: true,
    saveUninitialized: true
}));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/routes');
require('./filters/filters');

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

var socketIO = require('socket.io').listen(server);
app.set('socketIO', socketIO);
require('./socket/socket');