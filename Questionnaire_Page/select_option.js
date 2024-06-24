document.addEventListener('DOMContentLoaded', function() {
    var answerItems = document.querySelectorAll('.answer-item');
    console.log('Number of answer items:', answerItems.length);

    answerItems.forEach(function(answerItem, index) {
        console.log('Processing item', index);

        var savedState = sessionStorage.getItem('answer-item-' + index);
        if (savedState === 'selected') {
            answerItem.classList.add('answer-item-selected');
        }

        answerItem.addEventListener('click', function() {
            console.log('Clicked item', index);

            if (answerItem.classList.contains('answer-item-selected')) {
                answerItem.classList.remove('answer-item-selected');
                sessionStorage.setItem('answer-item-' + index, 'deselected');
            } else {
                answerItem.classList.add('answer-item-selected');
                sessionStorage.setItem('answer-item-' + index, 'selected');
            }
        });
    });
});
