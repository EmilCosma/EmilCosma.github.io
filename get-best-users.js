fetch('https://rest-api-peach.vercel.app/api/users')
            .then(response => response.json())
            .then(users => {
                users.sort((a, b) => b.score - a.score);
                  
                const topUsers = users.slice(0, 5);
                const userElements = document.querySelectorAll('.user');
    
                topUsers.forEach((user, index) => {
                    userElements[index].textContent = `${index + 1}. ${user.username} - ${user.score} points`;
                });
            })
            .catch(error => console.error('An error occurred:', error));