// Construct socket
const io = require('socket.io')();
const port = 7777;

var usernames = [];

io.on('connection', (client) => {

    client.on('login', (msg) => {
        console.log(msg.username);
        if(usernames.indexOf(msg.username) === -1) {
            usernames.push(msg.username);
            client.emit('login', {success: true});
        } else {
            client.emit('login', {success: false});
        }
    })

});

// Start server
io.listen(port);
console.log('listening on port ', port);