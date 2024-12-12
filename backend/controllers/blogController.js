const Blog = require('../models/blogModel');

// Add a new blog
exports.addBlog = async (req, res) => {
  const { title, content, category, tags } = req.body;
  
  // Validation for empty fields
  if (!title || !content || !category || !tags) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newBlog = new Blog({ title, content, category, tags });
    await newBlog.save();
    res.status(201).json({ message: 'Blog added successfully', blog: newBlog });
  } catch (error) {
    res.status(400).json({ message: 'Error adding blog', error });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching blogs', error });
  }
};

// Get blogs by category
exports.getBlogsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const blogs = await Blog.find({ category });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching blogs by category', error });
  }
};

// Get blogs by tag
exports.getBlogsByTag = async (req, res) => {
  const { tag } = req.params;

  try {
    const blogs = await Blog.find({ tags: tag });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching blogs by tag', error });
  }
};

// Update blog
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, tags } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content, category, tags }, { new: true });
    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    res.status(400).json({ message: 'Error updating blog', error });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting blog', error });
  }
};
