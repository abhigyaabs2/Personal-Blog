const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const requestBody = {
        username: username,
        email: email,
        password: password,
    };

    try {
        const response = await fetch('http://localhost:8080/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            alert('Signup successful! Redirecting to login...');
            window.location.href = 'login.html';
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message || 'Failed to sign up'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while signing up. Please try again later.');
    }
});

