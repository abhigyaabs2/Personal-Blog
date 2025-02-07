const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const requestBody = {
        username: username,
        password: password,
    };

    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            const data = await response.json();

            // Save the token and userId in localStorage
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userId', data.userId); // ✅ Store userId
            

            console.log('Token:', data.token);
            console.log('User ID:', data.userId); // Debugging purpose

            alert('Login successful!');

            // Redirect to the homepage or dashboard
            window.location.href = 'index.html';
        } else {
            // Handle errors from the backend
            const errorData = await response.json();
            alert(`Error: ${errorData.message || 'Invalid login credentials'}`);
        }
    } catch (error) {
        // Handle network or unexpected errors
        console.error('Error:', error);
        alert('An error occurred while logging in. Please try again later.');
    }
});
