let questionnaires = [];

window.onload = function() {
    fetch('https://rest-api-peach.vercel.app/api/questionnaire/random/1')
        .then(response => response.json())
        .then(data => {
            questionnaires = data;
            const questionnaire = questionnaires[0];

            document.getElementById('question').textContent = questionnaire.text;
            document.getElementById('option1').textContent = questionnaire.option1;
            document.getElementById('option2').textContent = questionnaire.option2;
            document.getElementById('option3').textContent = questionnaire.option3;
            document.getElementById('popup').textContent = questionnaire.hint;

            if (questionnaire.image_url !== 'null') {
                window.location.href = 'your_redirect_url_here';
            }
        })
        .catch(error => console.error('Error:', error));
};