const apiUrl = 'http://localhost:8080/api'; // Base API URL
const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
console.log("Token:", token);
console.log("User ID:", userId);

// Redirect if user is not authenticated
if (!token || !userId) {
    alert('You are not logged in. Redirecting to login page...');
    window.location.href = 'login.html';
}


// Function to handle blog form submission for creating or updating a blog
const blogForm = document.getElementById('blogForm');
if (blogForm) {
    blogForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        const blogId = localStorage.getItem('editingBlogId'); // Check if we're editing a blog

        if (!title || !content) {
            alert('Title and content are required!');
            return;
        }
        
        if (!userId || isNaN(userId)) {
            alert('User ID is missing. Please log in again.');
            window.location.href = 'login.html';
        }

        const requestBody = {
            title,
            content,
            user: { id: Number(userId) }  
        };


        const apiEndpoint = blogId
            ? `${apiUrl}/blogs/${blogId}` // Edit blog (PUT)
            : `${apiUrl}/blogs`; // Create blog (POST)

        const method = blogId ? 'PUT' : 'POST';

        try {
            const response = await fetch(apiEndpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                alert(`Blog ${blogId ? 'updated' : 'created'} successfully!`);
                localStorage.removeItem('editingBlogId'); // Clear editing state
                window.location.href = 'index.html'; // Redirect to blog list
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Failed to save blog'}`);
            }
        } catch (error) {
            console.error('Error saving blog:', error);
            alert('An error occurred while saving the blog. Please try again later.');
        }
    });
}

// Function to handle editing a blog
async function editBlog(blogId) {
    try {
        const response = await fetch(`${apiUrl}/blogs/${blogId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const blog = await response.json();

            // Populate the form with blog data
            document.getElementById('title').value = blog.title;
            document.getElementById('content').value = blog.content;

            // Update form UI for editing mode
            document.getElementById('formTitle').textContent = 'Edit Blog';
            document.getElementById('submitButton').textContent = 'Update Blog';

            // Save the blog ID to localStorage for reference
            localStorage.setItem('editingBlogId', blogId);
        } else {
            alert('Failed to fetch blog data for editing.');
        }
    } catch (error) {
        console.error('Error fetching blog data:', error);
        alert('An error occurred while fetching the blog. Please try again later.');
    }
}

// Function to handle blog deletion
async function deleteBlog(blogId) {
    const confirmation = confirm('Are you sure you want to delete this blog?');
    if (!confirmation) return;

    try {
        const response = await fetch(`${apiUrl}/blogs/${blogId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            alert('Blog deleted successfully!');
            window.location.href = 'index.html'; // Redirect to blog list
        } else {
            alert('Failed to delete the blog. Please try again.');
        }
    } catch (error) {
        console.error('Error deleting blog:', error);
        alert('An error occurred while deleting the blog. Please try again later.');
    }
}

// Check if we are in editing mode (based on URL or saved state)
const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get('id');

if (blogId) {
    editBlog(blogId); // Load blog for editing if the ID is in the URL
}
