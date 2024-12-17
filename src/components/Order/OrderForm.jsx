import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { createOrder, updateOrder } from '../../api/orderApi';
import { fetchProducts } from '../../components/ProductList/ProductListLogic';

const OrderForm = ({ order, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    or_pd_id: '',
    or_amount: '',
  });
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (order) {
      setFormData({
        or_pd_id: order.or_pd_id,
        or_amount: order.or_amount,
      });
    }
    loadProducts();
  }, [order]);

  const loadProducts = async () => {
    try {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (order) {
        await updateOrder(order.or_id, formData);
      } else {
        await createOrder(formData);
      }
      onSave();
    } catch (error) {
      setError('Gagal menyimpan pesanan');
      console.error('Save order error:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6">{order ? 'Edit Pesanan' : 'Tambah Pesanan Baru'}</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <FormControl fullWidth margin="normal">
        <InputLabel id="product-label">Produk</InputLabel>
        <Select
          labelId="product-label"
          id="or_pd_id"
          name="or_pd_id"
          value={formData.or_pd_id}
          onChange={handleChange}
          label="Produk"
        >
          {products.map((product) => (
            <MenuItem key={product.pd_id} value={product.pd_id}>
              {product.pd_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        margin="normal"
        required
        fullWidth
        id="or_amount"
        label="Jumlah"
        name="or_amount"
        type="number"
        value={formData.or_amount}
        onChange={handleChange}
      />
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" sx={{ mr: 1 }}>
          {order ? 'Update' : 'Tambah'}
        </Button>
        <Button onClick={onCancel} variant="outlined">
          Batal
        </Button>
      </Box>
    </Box>
  );
};

export default OrderForm;

