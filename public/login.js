document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    // Store the username in localStorage so it can be accessed in the trading system page
    localStorage.setItem('username', username);

    if (username.trim() === '') {
        // If the username is empty, display an error message and stop the form submission
        alert('Username cannot be empty');
        return;
    }
    // Redirect to the trading system page
    window.location.href = '/index.html'; // change this to the name of your trading system page
    
});
