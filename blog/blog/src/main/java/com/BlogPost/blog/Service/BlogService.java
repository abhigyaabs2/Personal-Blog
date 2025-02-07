package com.BlogPost.blog.Service;


import jakarta.persistence.EntityManager;
import com.BlogPost.blog.Entity.Blog;
import com.BlogPost.blog.Entity.User;
import com.BlogPost.blog.Repository.BlogRepository;
import com.BlogPost.blog.Repository.UserRepository;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private UserRepository userRepository;
    @PersistenceContext
    private EntityManager entityManager;

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

//    public Blog createBlog(Blog blog) {
//        User user = blog.getUser();
//        if (user.getId() == null) {
//            user = userRepository.save(user);
//        }
//        blog.setUser(user);
//        return blogRepository.save(blog);
//    }

//    @Transactional
//    public Blog createBlog(Blog blog) {
//        blog.setUser(entityManager.merge(blog.getUser())); // Merge ensures user is managed
//        return blogRepository.save(blog);
//    }



//    public Blog createBlog(Blog blog) {
//        return blogRepository.save(blog);
//    }

    @Transactional
    public Blog createBlog(Blog blog) {
        if (blog.getUser() == null || blog.getUser().getId() == null) {
            throw new IllegalArgumentException("User ID must not be null");
        }

        // Retrieve the User by its ID
        User user = userRepository.findById(blog.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Associate the retrieved User with the Blog
        blog.setUser(user);

        // Save the Blog
        return blogRepository.save(blog);
    }




    public Optional<Blog> getBlogById(Long id) {
        return blogRepository.findById(id);
    }

    public Blog updateBlog(Long id, Blog blog) {
        Optional<Blog> existingBlog = blogRepository.findById(id);
        if (existingBlog.isPresent()) {
            Blog updatedBlog = existingBlog.get();
            updatedBlog.setTitle(blog.getTitle());
            updatedBlog.setContent(blog.getContent());
            updatedBlog.setUpdatedAt(blog.getUpdatedAt());
            return blogRepository.save(updatedBlog);
        }
        throw new RuntimeException("Blog not found with id: " + id);
    }


    public void deleteBlog(Long id) {
        if (!blogRepository.existsById(id)) {
            throw new RuntimeException("Blog not found with id: " + id);
        }
        blogRepository.deleteById(id);
    }

}

