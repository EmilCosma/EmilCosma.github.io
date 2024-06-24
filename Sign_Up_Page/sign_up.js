window.onload = function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        const email = document.querySelector('#email').value;
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        const confirmPassword = document.querySelector('#confirm-password').value;

        if(password !== confirmPassword) {
            alert('Passwords do not match!');
            event.preventDefault();
        }
        else{
            fetch('https://rest-api-peach.vercel.app/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email,username, password })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message );
            if (data.valid) {
                window.location.href = '../Login_Page/login_page.html';
            }
        })
        .catch(error => {
            alert('An error occurred: ' + error.message);
        });
        }
    });
};