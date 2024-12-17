import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { login } from '../../api/userApi';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    us_email: '',
    us_password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      localStorage.setItem('token', response.data.token);
      onLoginSuccess(response.data.token);
    } catch (error) {
      setError('Login gagal. Periksa email dan password Anda.');
      console.error('Login error:', error);
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
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="us_email"
            label="Alamat Email"
            name="us_email"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
            value={formData.us_password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
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

export default Login;