window.onload = function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        fetch('https://rest-api-peach.vercel.app/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('token', data.token);
            if (data.valid) {
                window.location.href = '../index.html';
            }
            else {
                alert('Invalid username or password');
            }
        })
        .catch(error => {
            alert('An error occurred: ' + error.message);
        });
    });
};