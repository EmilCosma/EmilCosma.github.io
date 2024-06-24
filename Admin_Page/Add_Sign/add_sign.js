window.onload = function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const title = document.querySelector('#name').value;
        const text = document.querySelector('#text').value;
        const type = document.querySelector('#type').value;
        const image_url = document.querySelector('#image_url').value;
            fetch('https://rest-api-peach.vercel.app/api/sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, text, type, image_url})
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