// Fetch the signs from the API
fetch('https://rest-api-peach.vercel.app/api/signs')
    .then(response => response.json())
    .then(signs => {
        // Filter the signs by type
        const warningSigns = signs.filter(sign => sign.type === 'prioritate');

        // Get the signs container
        const signsContainer = document.getElementById('signs-container');

        // Create a box for each warning sign
        warningSigns.forEach(sign => {
            // Create the box
            const box = document.createElement('div');
            box.classList.add('sign-box');

            // Create the image
            const img = document.createElement('img');
            img.src = 'images/' + sign.image_url;
            box.appendChild(img);

            // Create the title
            const title = document.createElement('h2');
            title.textContent = sign.title;
            box.appendChild(title);

            // Create the text
            const text = document.createElement('p');
            text.textContent = sign.text;
            text.style.display = 'none'; // Hide the text initially
            box.appendChild(text);

            // Add an event listener to expand or collapse the box when clicked
            box.addEventListener('click', () => {
                if (box.classList.contains('expanded')) {
                    // If the box is already expanded, collapse it
                    box.classList.remove('expanded');
                    text.style.display = 'none';
                } else {
                    // If the box is not expanded, collapse all other boxes and expand this one
                    document.querySelectorAll('.sign-box.expanded').forEach(expandedBox => {
                        expandedBox.classList.remove('expanded');
                        expandedBox.querySelector('p').style.display = 'none';
                    });
                    box.classList.add('expanded');
                    text.style.display = 'block';
                }
            });

            // Add the box to the signs container
            signsContainer.appendChild(box);
        });
    });