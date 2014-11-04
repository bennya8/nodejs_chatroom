var app = require('../app');

// app modules
var site = require('./site/site');

// route rules
app.use(site.authorize);
app.get('/', site.index);
app.get('/chatroom', site.chatroom);
app.post('/doLogin', site.doLogin);
app.get('*', site.index);
