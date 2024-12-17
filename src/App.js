import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import ProductList from './components/ProductList/ProductList';
import ProductForm from './components/ProductForm/ProductForm';
import { createProduct, updateProduct } from './components/ProductList/ProductListLogic';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CategoryManagement from './components/Category/CategoryManagement';
import OrderManagement from './components/Order/OrderManagement';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [activeComponent, setActiveComponent] = useState('products');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleCreateProduct = async (productData) => {
    await createProduct(productData);
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleUpdateProduct = async (productData) => {
    if (editingProduct) {
      await updateProduct(editingProduct.pd_id, productData);
      setShowForm(false);
      setEditingProduct(null);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <Container>
        {showRegister ? (
          <>
            <Register onRegisterSuccess={handleLoginSuccess} />
            <Button onClick={() => setShowRegister(false)}>Sudah punya akun? Login</Button>
          </>
        ) : (
          <>
            <Login onLoginSuccess={handleLoginSuccess} />
            <Button onClick={() => setShowRegister(true)}>Belum punya akun? Register</Button>
          </>
        )}
      </Container>
    );
  }

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h2" gutterBottom>
          Manajemen Toko
        </Typography>
        <Box>
          <Button onClick={() => setActiveComponent('products')} sx={{ mr: 2 }}>
            Produk
          </Button>
          <Button onClick={() => setActiveComponent('categories')} sx={{ mr: 2 }}>
            Kategori
          </Button>
          <Button onClick={() => setActiveComponent('orders')} sx={{ mr: 2 }}>
            Pesanan
          </Button>
          <Button onClick={handleLogout} variant="outlined" color="secondary">
            Logout
          </Button>
        </Box>
      </Box>
      {activeComponent === 'products' && (
        <>
          {showForm ? (
            <ProductForm
              product={editingProduct || undefined}
              onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
            />
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowForm(true)}
                sx={{ mb: 2 }}
              >
                Tambah Produk Baru
              </Button>
              <ProductList onEditProduct={handleEditProduct} />
            </>
          )}
        </>
      )}
      {activeComponent === 'categories' && <CategoryManagement />}
      {activeComponent === 'orders' && <OrderManagement />}
    </Container>
  );
};

export default App;

