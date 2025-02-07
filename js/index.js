document.addEventListener("DOMContentLoaded", () => {
    const blogsList = document.getElementById('blogsList');
    
    async function fetchBlogs() {
        try {
            const response = await fetch('http://localhost:8080/api/blogs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            
            if (response.ok) {
                const blogs = await response.json();
                
                if (blogs.length === 0) {
                    blogsList.innerHTML = '<p>No blog posts available yet.</p>';
                } else {
                    blogsList.innerHTML = blogs.map(blog => {
                        return `
                            <div class="col-md-4">
                                <div class="card">
    
                                    <div class="card-body">
                                        <h5 class="card-title">${blog.title}</h5>
                                        <p class="card-text">${blog.content.substring(0, 100)}...</p>
                                    </div>
                                    <div class="card-footer text-center">
                                        <a href="blog-details.html?id=${blog.id}" class="btn btn-primary">Read More</a>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('');
                }
            } else {
                const errorData = await response.json();
                alert(`Error fetching blogs: ${errorData.message || 'Please try again later.'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while fetching the blogs. Please try again later.');
        }
    }

    fetchBlogs();
});
