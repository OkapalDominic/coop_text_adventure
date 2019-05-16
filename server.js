// Construct socket
const io = require('socket.io')();
const port = 7777;

io.on('connection', (client) => {
    
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            client.emit('timer', new Date());
        }, interval);
    });

});

// Start server
io.listen(port);
console.log('listening on port ', port);