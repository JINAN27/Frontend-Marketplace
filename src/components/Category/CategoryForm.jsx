import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createCategory, updateCategory } from '../../api/categoryApi';

const CategoryForm = ({ category, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    ct_code: '',
    ct_name: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (category) {
      setFormData({
        ct_code: category.ct_code,
        ct_name: category.ct_name,
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (category) {
        await updateCategory(category.ct_id, formData);
      } else {
        await createCategory(formData);
      }
      onSave();
    } catch (error) {
      setError('Gagal menyimpan kategori');
      console.error('Save category error:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6">{category ? 'Edit Kategori' : 'Tambah Kategori Baru'}</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        margin="normal"
        required
        fullWidth
        id="ct_code"
        label="Kode Kategori"
        name="ct_code"
        value={formData.ct_code}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="ct_name"
        label="Nama Kategori"
        name="ct_name"
        value={formData.ct_name}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" sx={{ mt: 3, mr: 1 }}>
        {category ? 'Update' : 'Tambah'}
      </Button>
      <Button onClick={onCancel} variant="outlined" sx={{ mt: 3 }}>
        Batal
      </Button>
    </Box>
  );
};

export default CategoryForm;

