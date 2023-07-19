const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(express.static('public'));
const server = http.createServer(app);
const io = socketIo(server);

let lastBought = null;
let lastSold = null;

io.on('connection', (socket) => {
    socket.emit('update', { lastBought, lastSold });

    socket.on('newOrder', (order) => {
        if (order.side.toLowerCase() === 'buy') {
            lastBought = order.price;
        } else if (order.side.toLowerCase() === 'sell') {
            lastSold = order.price;
        }

        io.emit('update', { lastBought, lastSold });
    });
});

server.listen(3000, () => console.log('Server listening on port 3000'));
