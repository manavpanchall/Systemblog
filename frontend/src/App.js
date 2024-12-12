import React from 'react';
import BlogManagement from './BlogManagement';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Blog Management System
      </Typography>
      <BlogManagement />
    </Container>
  );
}

export default App;
