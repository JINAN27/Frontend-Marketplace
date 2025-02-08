import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { fetchProducts, deleteProduct } from './ProductListLogic';
import { getCategories } from '../../api/categoryApi';

const ProductList = ({ onEditProduct }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      setError('Gagal mengambil data produk');
      console.error('Fetch products error:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      setError('Gagal menghapus produk');
      console.error('Delete product error:', error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.pd_ct_id === selectedCategory)
    : products;

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="category-filter-label">Filter berdasarkan Kategori</InputLabel>
          <Select
            labelId="category-filter-label"
            id="category-filter"
            value={selectedCategory}
            label="Filter berdasarkan Kategori"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">
              <em>Semua Kategori</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.ct_id} value={category.ct_id}>
                {category.ct_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.pd_id}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={`https://be-toko-hp-production.up.railway.app${product.pd_image}`}
                alt={product.pd_name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.pd_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kode: {product.pd_code}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kategori: {categories.find(cat => cat.ct_id === product.pd_ct_id)?.ct_name || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Harga: Rp {product.pd_price.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stok: {product.pd_quantity}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button onClick={() => onEditProduct(product)} sx={{ mr: 1 }}>Edit</Button>
                  <Button onClick={() => handleDelete(product.pd_id)} color="secondary">Hapus</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;

