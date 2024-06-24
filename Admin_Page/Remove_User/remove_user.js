window.onload = function() {
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const username = document.getElementById('username').value;

        fetch(`https://rest-api-peach.vercel.app/api/user/${username}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        })
        .then(response => response.json())
        .then(data => {
            console.log('data.valid:', data.valid);
            alert(data.message)
            console.log('data.valid:', data.valid);
            if (data.valid) {
                window.location.href = '../../Registered_Action/registered_action_page.html';
            }
            else{
                window.location.href = '../../Unregister_Action/unregistered_action_page.html';
            }
        })
        .catch(error => console.error('Error:', error));
    });
}