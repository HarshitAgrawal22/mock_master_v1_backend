import React from 'react';
import { Typography, Container } from '@mui/material';

const Jeader = ({ title, subtitle }) => {
  return (
    <Container className="header">
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          fontSize: 36,
          fontWeight: 700,
          color: '#FFFFFF',
          mb: 2,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontSize: 20,
          fontWeight: 400,
          color: '#F8E231',
          fontStyle: 'italic',
          mb: 4,
        }}
      >
        {subtitle}
      </Typography>
    </Container>
  );
};

export default Jeader;