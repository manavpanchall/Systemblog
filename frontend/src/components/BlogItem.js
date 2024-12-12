import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const BlogItem = ({ blog }) => {
  return (
    <Card style={{ marginBottom: 16 }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {blog.title}
        </Typography>
        <Typography variant="body2" component="p">
          {blog.content}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Category: {blog.category}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Tags: {blog.tags.join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogItem;
