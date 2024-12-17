import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { getCategories } from '../../api/categoryApi';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    pd_code: '',
    pd_ct_id: '',
    pd_name: '',
    pd_price: '',
    pd_description: '',
    pd_quantity: '',
    pd_image: null,
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        pd_code: product.pd_code || '',
        pd_ct_id: product.pd_ct_id || '',
        pd_name: product.pd_name || '',
        pd_price: product.pd_price || '',
        pd_description: product.pd_description || '',
        pd_quantity: product.pd_quantity || '',
        pd_image: null,
      });
    }
    fetchCategories();
  }, [product]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Gagal mengambil data kategori');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, pd_image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        productData.append(key, formData[key]);
      }
    }
    onSubmit(productData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6">{product ? 'Edit Produk' : 'Tambah Produk Baru'}</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        margin="normal"
        required
        fullWidth
        id="pd_code"
        label="Kode Produk"
        name="pd_code"
        value={formData.pd_code}
        onChange={handleChange}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="category-label">Kategori</InputLabel>
        <Select
          labelId="category-label"
          id="pd_ct_id"
          name="pd_ct_id"
          value={formData.pd_ct_id}
          onChange={handleChange}
          label="Kategori"
        >
          {categories.map((category) => (
            <MenuItem key={category.ct_id} value={category.ct_id}>
              {category.ct_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        margin="normal"
        required
        fullWidth
        id="pd_name"
        label="Nama Produk"
        name="pd_name"
        value={formData.pd_name}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="pd_price"
        label="Harga"
        name="pd_price"
        type="number"
        value={formData.pd_price}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="pd_description"
        label="Deskripsi"
        name="pd_description"
        multiline
        rows={4}
        value={formData.pd_description}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="pd_quantity"
        label="Jumlah"
        name="pd_quantity"
        type="number"
        value={formData.pd_quantity}
        onChange={handleChange}
      />
      <input
        accept="image/*"
        id="pd_image"
        name="pd_image"
        type="file"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="pd_image">
        <Button variant="contained" component="span" sx={{ mt: 2 }}>
          Upload Gambar
        </Button>
      </label>
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" sx={{ mr: 1 }}>
          {product ? 'Update' : 'Tambah'}
        </Button>
        <Button onClick={onCancel} variant="outlined">
          Batal
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;

