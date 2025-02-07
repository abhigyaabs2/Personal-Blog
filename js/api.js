const BASE_URL = 'http://localhost:8080/api';

const apiCall = async (endpoint, method = 'GET', body = null) => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
    }

    return response.json();
};
