const socket = io('http://localhost:3000');
var username = localStorage.getItem('username');
document.getElementById('username').textContent = 'Username: ' + username;
socket.on('update', (data) => {
    document.getElementById('last-bought').textContent = 'Last Bought: ' + data.lastBought;
    document.getElementById('last-sold').textContent = 'Last Sold: ' + data.lastSold;
   
    

});
socket.on('updateAmount', (data) => {
    document.getElementById('amountb').textContent = 'Balance: ' + data.amount;
});
socket.on('error', (data) => {
    // Handle the error here
    document.getElementById('error').textContent = 'Error : Insufficient amount ';
});


document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();

   
    var side = document.getElementById('side').value;
    var quantity = document.getElementById('quantity').value;
    var price = document.getElementById('price').value;
    socket.emit('newOrder', { side, quantity, price, amount });
    
});

document.getElementById('amount-form').addEventListener('submit', function(event) {
    event.preventDefault();

   
    var amount = Number(document.getElementById('amount').value);
    socket.emit('newAmount', { amount });

    
});


