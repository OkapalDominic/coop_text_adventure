// Construct socket
const io = require('socket.io')();
const port = 7777;

var usernames = [];

io.on('connection', (client) => {
    
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            client.emit('timer', new Date());
        }, interval);
    });

    client.on('login', (msg) => {
        console.log(msg.username);
        usernames.push(msg.username);
        client.emit('login', {success: true});
    })

});

// Start server
io.listen(port);
console.log('listening on port ', port);