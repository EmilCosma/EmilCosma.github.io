let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let questionNumber = 1;
let questions = [];
function loadQuestions() {
    fetch('https://rest-api-peach.vercel.app/api/questionnaire/random/26')
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestion(questions[currentQuestionIndex]);
        })
        .catch(error => console.error('Error:', error));
}
function deselectOptions()
{
    for (var i = 0; i < sessionStorage.length; i++) {
        var key = sessionStorage.key(i);
        if (key.startsWith('answer-item-')) {
            sessionStorage.removeItem(key);
        }
    }
}

function displayQuestion(questionnaire) {
    document.getElementById('question').textContent = questionnaire.text;
            document.getElementById('option1').textContent = questionnaire.option1;
            document.getElementById('option2').textContent = questionnaire.option2;
            document.getElementById('option3').textContent = questionnaire.option3; 
            document.getElementById('question_number').textContent = 'Intrebarea ' + (questionNumber );
            document.getElementById('question_remaining').textContent = 'Intrebari ramase:  ' + (26-questionNumber);
            document.getElementById('answered_questions').textContent = 'Intrebari raspunse:  ' + (correctAnswers+incorrectAnswers);
            const imageUrl = questionnaire.image_url;
            const imageElement = document.getElementById('image_question');
            document.getElementById('correct-answers').textContent = correctAnswers+'    \u2713';
            document.getElementById('incorrect-answers').textContent =+ incorrectAnswers + '    \u2717';
            if (imageUrl !== 'null') {
                imageElement.src = `images/${imageUrl}`;
                imageElement.style.display = 'flex';
                //imageElement.image.remove('hidden');
            } else {
                imageElement.style.display = 'none'; 
                //imageElement.image.add('hidden');
            }
            for (let i = 0; i < 3; i++) {
                sessionStorage.setItem(`option${i}`, '0');
            }
            deselectOptions();
            
}
document.getElementById('skip-question').addEventListener('click', function() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(questions[currentQuestionIndex]);
    } else {
        currentQuestionIndex = 0;
        displayQuestion(questions[currentQuestionIndex]);
    }
});
document.getElementById('submit-question').addEventListener('click', function() {
    const solution = questions[currentQuestionIndex].solution;
    let correct = true;
    for (let i = 0; i < 3; i++) {
        let selected = sessionStorage.getItem(`option${i}`) ;

        console.log(`Option ${i+1}: selected = ${selected}, solution = ${solution[i]}`);
        console.log(`${solution}`);
        if(selected === null)
            selected = '0';
        if (solution[i] !== selected) {
            correct = false;
            break;
        }
    }
    if (correct) {
        correctAnswers++;
    } else {
        incorrectAnswers++;
    }
    questionNumber++;
    if(incorrectAnswers > 6)
    {
        window.location.href = '../Failed_Questionnaire_Page/failed_questionnaire_page.html';
    }

    questions.splice(currentQuestionIndex, 1);
    currentQuestionIndex;
    if (currentQuestionIndex < questions.length) {
       displayQuestion(questions[currentQuestionIndex]);
    }   
    else if(questions.length !== 0)
    {
        questionNumber++;
        currentQuestionIndex = 0;
        displayQuestion(questions[currentQuestionIndex]);
    }
    else{
        const token = localStorage.getItem('token');
        fetch('https://rest-api-peach.vercel.app/api/user/increase_hard_questionnaire', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
           
            'Authorization': 'Bearer ' + token
        }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            console.log('Success:', data);
        }).catch((error) => {
            console.error('Error:', error);
        });
        window.location.href = '../Completed_Questionnaire_Page/completed_questionnaire_page.html';
    }
    deselectOptions();
   
});

function selectOption(optionIndex) {
    // Get the option element
    const optionElement = document.getElementById(`option${optionIndex + 1}`);

    // Get the current selected state of the option
    const selected = optionElement.classList.contains('selected') ? '1' : '0';

    // Toggle the selected state of the option
    optionElement.classList.toggle('selected');

    // Set the sessionStorage item for the option to the opposite of the current selected state
    sessionStorage.setItem(`option${optionIndex}`, selected === '1' ? '0' : '1');

    console.log(`setItem called with key = option${optionIndex}, value = ${selected === '1' ? '0' : '1'}`);
}
document.querySelectorAll('.answer-item').forEach((item, index) => {
    item.addEventListener('click', () => selectOption(index));
});
function deselectOptions() {
    document.querySelectorAll('.answer').forEach((item, index) => {
        item.classList.remove('selected');
        sessionStorage.removeItem(`answer-item-${index}`);
    });
}

loadQuestions();

var timeLeft =  15 * 60;

var timerInterval = setInterval(function() {
    timeLeft--;
    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft % 60;
    document.getElementById('timer').textContent = 'Timp ramas : ' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

   
    localStorage.setItem('timeLeft', timeLeft);

   
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        window.location.href = '../Time_Out_Page/time_out_page.html';
    }
}, 1000);