const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

// Routes for CRUD operations
router.post('/add-blog', blogController.addBlog);
router.get('/blogs', blogController.getAllBlogs);
router.get('/blogs/category/:category', blogController.getBlogsByCategory);
router.get('/blogs/tag/:tag', blogController.getBlogsByTag);
router.put('/update-blog/:id', blogController.updateBlog);
router.delete('/delete-blog/:id', blogController.deleteBlog);

module.exports = router;
