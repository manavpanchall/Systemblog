import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', category: '', tags: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs')
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  const handleInputChange = (e) => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddBlog = () => {
    if (!newBlog.title || !newBlog.content || !newBlog.category || !newBlog.tags) {
      alert('Please fill all fields');
      return;
    }

    axios.post('http://localhost:5000/api/add-blog', {
      title: newBlog.title,
      content: newBlog.content,
      category: newBlog.category,
      tags: newBlog.tags.split(',')
    })
      .then(response => {
        setBlogs([...blogs, response.data.blog]);
        setNewBlog({ title: '', content: '', category: '', tags: '' });
        alert('Blog added successfully!');
      })
      .catch(error => console.error('Error adding blog:', error));
  };

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Add New Blog
      </Typography>
      <Paper style={{ padding: 16 }}>
        <TextField
          label="Title"
          name="title"
          value={newBlog.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Content"
          name="content"
          value={newBlog.content}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Category"
          name="category"
          value={newBlog.category}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tags (comma separated)"
          name="tags"
          value={newBlog.tags}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddBlog} style={{ marginTop: 16 }}>
          Add Blog
        </Button>
      </Paper>
      <Typography variant="h4" component="h2" gutterBottom style={{ marginTop: 32 }}>
        Blogs
      </Typography>
      <List>
        {blogs.map((blog) => (
          <ListItem key={blog._id} component={Paper} style={{ marginBottom: 16 }}>
            <ListItemText
              primary={blog.title}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="textPrimary">
                    {blog.content}
                  </Typography>
                  <br />
                  Category: {blog.category}
                  <br />
                  Tags: {blog.tags.join(', ')}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default BlogManagement;
