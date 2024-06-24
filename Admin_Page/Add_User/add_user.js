window.onload = function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

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
            body: JSON.stringify({ username, password})
            })
            .then(response => response.json())
            .then(data => {
                if (data.valid) {
                    window.location.href = '../../Registered_Action/registered_action_page.html';
                }
                else{
                    window.location.href = '../../Unregistered_Action/unregistered_action_page.html';
                }
            })
            .catch(error => console.error('Error:', error));
        }
    });
}