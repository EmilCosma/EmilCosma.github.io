window.onload = function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        const password = document.querySelector('#password').value;
        const confirmPassword = document.querySelector('#confirm-password').value;

        if(password !== confirmPassword) {
            alert('Passwords do not match!');
            event.preventDefault();
        }
        else{
            let params = new URLSearchParams(window.location.search);
            let token = params.get('token');
            fetch('https://rest-api-peach.vercel.app/api/user/reset_password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({  password })
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