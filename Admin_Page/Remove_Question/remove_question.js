window.onload = function() {
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const question = document.getElementById('question').value;

        fetch(`https://rest-api-peach.vercel.app/api/questionnaire/${question}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        })
        .then(response => response.json())
        .then(data => {
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