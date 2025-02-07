package com.BlogPost.blog.Controller;



import com.BlogPost.blog.Entity.Blog;
import com.BlogPost.blog.Entity.User;
import com.BlogPost.blog.Repository.UserRepository;
import com.BlogPost.blog.Security.JwtUtil;
import com.BlogPost.blog.Service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;
    private static final Logger log = LoggerFactory.getLogger(BlogController.class);

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    @PostMapping
    public Blog createBlog(@RequestBody Blog blog) {
        return blogService.createBlog(blog);
    }

//    @PostMapping
//    public ResponseEntity<Blog> createBlog(@RequestBody Blog blog) {
//
//        log.info("Received Blog: {}", blog);
//        return ResponseEntity.ok(blogService.createBlog(blog));
//    }

//    @PostMapping
//    public ResponseEntity<Blog> createBlog(@RequestBody Blog blog, @AuthenticationPrincipal User user) {
//        blog.setUser(user); // Ensure user is set from token
//        return ResponseEntity.ok(blogService.createBlog(blog));
//    }


//    @PostMapping
//    public Blog createBlog(@RequestBody Blog blog, @RequestHeader("Authorization") String token) {
//        String username = jwtUtil.extractUsername(token);
//        User user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        blog.setUser(user);
//        return blogService.createBlog(blog);
//    }


    @GetMapping("/{id}")
    public Blog getBlogById(@PathVariable Long id) {
        return blogService.getBlogById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
    }

    @PutMapping("/{id}")
    public Blog updateBlog(@PathVariable Long id, @RequestBody Blog blog) {
        return blogService.updateBlog(id, blog);
    }

    @DeleteMapping("/{id}")
    public String deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return "Blog deleted successfully!";
    }
}
