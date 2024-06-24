document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenim comportamentul implicit al formularului
        const email = document.getElementById('email').value; // Capturăm adresa de email introdusă

        // Presupunem că există un endpoint `/api/user/send_email/:email` pentru trimiterea emailului
        fetch(`https://rest-api-peach.vercel.app/api/user/send_email/${email}`, {
            method: 'GET'
        })
        .then(response => {
            console.log(email);
            console.log(response);
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong on API server!');
        })
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error(error);
        });
    });
});