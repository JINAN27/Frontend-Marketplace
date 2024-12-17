import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { register } from '../../api/userApi';

const Register = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    us_name: '',
    us_email: '',
    us_password: '',
    us_phone_number: '',
    us_address: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      onRegisterSuccess(response.data.token);
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Register error:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="us_name"
            label="Full Name"
            name="us_name"
            autoComplete="name"
            autoFocus
            value={formData.us_name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="us_email"
            label="Email Address"
            name="us_email"
            autoComplete="email"
            value={formData.us_email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="us_password"
            label="Password"
            type="password"
            id="us_password"
            autoComplete="new-password"
            value={formData.us_password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="us_phone_number"
            label="Phone Number"
            id="us_phone_number"
            autoComplete="tel"
            value={formData.us_phone_number}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="us_address"
            label="Address"
            id="us_address"
            autoComplete="address"
            value={formData.us_address}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Register;

