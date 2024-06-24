window.onload = function() {
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const title = document.getElementById('name').value;

        fetch(`https://rest-api-peach.vercel.app/api/sign`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ title:title })
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
    });
}