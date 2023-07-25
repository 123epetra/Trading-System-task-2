const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(express.static('public', { index: 'login.html' }));


const server = http.createServer(app);
const io = socketIo(server);

let lastBought = null;
let lastSold = null;
let amounts = {};
io.on('connection', (socket) => {
    amounts[socket.id] = 0;
    socket.emit('update', { lastBought, lastSold, amount: amounts[socket.id] });
    
    socket.on('newOrder', (order) => {
        if (order.side && order.side.toLowerCase() === 'buy') {
            if (order.price>=lastSold){
            if (amounts[socket.id] >= order.price * order.quantity) {
                lastBought = order.price;
                amounts[socket.id] -= order.price * order.quantity;
            } else {
                socket.emit('error', { message: 'Insufficient amount' });
            }}
        else{
            socket.emit('errorSold', { message: 'Stock is not available at your price' });
        }
        } else if (order.side && order.side.toLowerCase() === 'sell') {
            lastSold = order.price;
            amounts[socket.id] += order.price * order.quantity;
        }

        
        io.emit('update', { lastBought, lastSold });
        socket.emit('updateAmount', { amount: amounts[socket.id] });
    });

    socket.on('newAmount', (data) => {
        amounts[socket.id] += Number(data.amount);
        
        io.emit('update', { lastBought, lastSold });
        socket.emit('updateAmount', { amount: amounts[socket.id] });
    });
    socket.on('disconnect', () => {
        delete amounts[socket.id]; 
    });
});


server.listen(3000, () => console.log('Server listening on port 3000'));
