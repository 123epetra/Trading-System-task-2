const socket = io('http://localhost:3000');

socket.on('update', (data) => {
    document.getElementById('last-bought').textContent = 'Last Bought: ' + data.lastBought;
    document.getElementById('last-sold').textContent = 'Last Sold: ' + data.lastSold;
});

document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var side = document.getElementById('side').value;
    var quantity = document.getElementById('quantity').value;
    var price = document.getElementById('price').value;

    socket.emit('newOrder', { username, side, quantity, price });
});
