let username;

const logoutButton = document.querySelector('#logout a');
    logoutButton.addEventListener('click', function(event) {
            event.preventDefault(); 
            localStorage.removeItem('token'); 
    
            window.location.href = '../index.html'; 
        }
    );

    const token = localStorage.getItem('token'); 

    fetch('https://rest-api-peach.vercel.app/api/user/rank', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })  
    .then(response => response.json())
    .then(data => {
        console.log('in fetch');
        document.getElementById('rank').textContent = 'Loc in topul utilizatorilor: ' + data.rank;
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
    

    fetch('https://rest-api-peach.vercel.app/api/user', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('username').textContent = 'Nume utilizator: ' + data.username;
        document.getElementById('email').textContent = 'Email: ' + data.email;
        document.getElementById('score').textContent = 'Punctaj: ' + data.score;
        document.getElementById('easy_questionnaires').textContent = 'Chestionare usoare: ' + data.easy_questionnaires;
        document.getElementById('medium_questionnaires').textContent = 'Chestionare medii: ' + data.medium_questionnaires;
        document.getElementById('hard_questionnaires').textContent = 'Chestionare grele: ' + data.hard_questionnaires;

        if (data.is_admin) {
            const adminLink = document.createElement('a');
            adminLink.href = '../Admin_Page/admin_page.html';
            adminLink.textContent = 'Admin Page';
            adminLink.style.textDecoration = 'none';
            adminLink.style.outline = 'none';
            adminLink.style.color='rgb(18, 18, 113)';
            adminLink.style.fontFamily='Helvetica, sans-serif'
            document.getElementById('adminLink').appendChild(adminLink);
            adminLink.addEventListener('mouseover', function() {
                this.style.color = 'rgba(48, 50, 162, 0.822)';
            });
        
            adminLink.addEventListener('mouseout', function() {
                this.style.color = 'rgb(18, 18, 113)';
            });

            username = data.username;
        }
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });

