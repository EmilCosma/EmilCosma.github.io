window.onload = function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const text = document.querySelector('#question').value;
        const option1 = document.querySelector('#answer-A').value;
        const option2 = document.querySelector('#answer-B').value;
        const option3 = document.querySelector('#answer-C').value;

        const solution_option1 = document.getElementsByName('solution-A');
        const solution_option2 = document.getElementsByName('solution-B');
        const solution_option3 = document.getElementsByName('solution-C');

        const hint = document.querySelector('#hint').value;
        const image_url = "null";

        var solution = "";

        for (var i = 0; i < solution_option1.length; i++) {
            if (solution_option1[i].checked) {
                solution = solution_option1[i].value.toString();
                break;
            }
        }

        for (var i = 0; i < solution_option2.length; i++) {
            if (solution_option2[i].checked) {
                solution += solution_option2[i].value.toString();
                break;
            }
        }

        for (var i = 0; i < solution_option3.length; i++) {
            if (solution_option3[i].checked) {
                solution += solution_option3[i].value.toString();
                break;
            }
        }
        console.log(solution);

        fetch('https://rest-api-peach.vercel.app/api/questionnaire', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, option1, option2, option3, solution, image_url, hint})
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