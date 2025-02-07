document.addEventListener("DOMContentLoaded", async () => {
    const blogDetail = document.getElementById('blogDetail');
    
    // Get blog ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');
    
    if (!blogId) {
        alert("Blog ID is missing.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/blogs/${blogId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        if (response.ok) {
            const blog = await response.json();

            blogDetail.innerHTML = `
                <h2 class="blog-title">${blog.title}</h2>
                <img src="${blog.imageUrl}" class="card-img-top" alt="${blog.title}">
                <p class="blog-content">${blog.content}</p>
            `;
        } else {
            const errorData = await response.json();
            alert(`Error fetching blog details: ${errorData.message || 'Please try again later.'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching the blog details. Please try again later.');
    }
});
