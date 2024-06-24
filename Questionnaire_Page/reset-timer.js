// Get all the buttons that start a questionnaire
var bigButtons = document.querySelectorAll('.big-button');
var littleButtons = document.querySelectorAll('.little-button');

// Add a click event listener to each big button
for (var i = 0; i < bigButtons.length; i++) {
    bigButtons[i].addEventListener('click', function() {
        // Reset the timer when the button is clicked
        localStorage.setItem('timeLeft', 30 * 60);
    });
}

// Add a click event listener to each little button
for (var i = 0; i < littleButtons.length; i++) {
    littleButtons[i].addEventListener('click', function() {
        // Reset the timer when the button is clicked
        localStorage.setItem('timeLeft', 30 * 60);
    });
}