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
var session = require('cookie-session');
var localize = require('./lang/' + setting.server.language);


var app = module.exports = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);

app.locals = localize;
app.set('env', 'environment');
app.set('setting', setting);
app.set('port', setting.server.port);
app.set('views', path.join(__dirname, 'views'));
//app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser('chatroom'));
app.use(session({keys: 'chatroom'}));
//app.use(app.router);
//app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
    app.use(express.logger('dev'));
}

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

require('./routes/routes');
require('./filters/filters');




server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
