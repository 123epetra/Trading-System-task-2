const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(express.static('public', { index: 'login.html' }));


const server = http.createServer(app);
const io = socketIo(server);

let lastBought = null;
let lastSold = null;
let amount = null;
io.on('connection', (socket) => {
    socket.emit('update', { lastBought, lastSold, amount });

    socket.on('newOrder', (order) => {
        if (order.side && order.side.toLowerCase() === 'buy') {
            if (amount >= order.price * order.quantity) {
                lastBought = order.price;
                amount -= order.price * order.quantity;
            } else {
                socket.emit('error', { message: 'Insufficient amount' });
            }
        } else if (order.side && order.side.toLowerCase() === 'sell') {
            lastSold = order.price;
            amount += order.price * order.quantity;
        }

        socket.emit('update', { lastBought, lastSold, amount });
    });

    socket.on('newAmount', (data) => {
        amount += Number(data.amount);
        socket.emit('update', { lastBought, lastSold, amount });
    });
});

server.listen(3000, () => console.log('Server listening on port 3000'));
