var app = require('../app');
var socketIO = app.get('socketIO');
var messages = [];


socketIO.on('connection', function(socket){

    socket.emit('chat history', messages);

    socket.on('chat message', function(msg){
        if(messages.length > 10){
            messages.shift();
        }
        messages.push(msg);
        socketIO.emit('chat message', msg);
    });

    socket.on('disconnect', function(){
        //console.log('user disconnected');
    });
});