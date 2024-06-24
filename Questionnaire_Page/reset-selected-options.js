// Clear sessionStorage when the page loads
window.addEventListener('load', function() {
    for (var i = 0; i < sessionStorage.length; i++) {
        var key = sessionStorage.key(i);
        if (key.startsWith('answer-item-')) {
            sessionStorage.removeItem(key);
        }
    }
});