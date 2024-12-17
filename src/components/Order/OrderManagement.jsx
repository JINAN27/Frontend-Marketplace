import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import OrderList from './OrderList';
import OrderForm from './OrderForm';

const OrderManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleSaveOrder = () => {
    setShowForm(false);
    setEditingOrder(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manajemen Pesanan
      </Typography>
      {showForm ? (
        <OrderForm
          order={editingOrder}
          onSave={handleSaveOrder}
          onCancel={() => {
            setShowForm(false);
            setEditingOrder(null);
          }}
        />
      ) : (
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowForm(true)}
            sx={{ mb: 2 }}
          >
            Tambah Pesanan Baru
          </Button>
          <OrderList onEditOrder={handleEditOrder} />
        </Box>
      )}
    </Container>
  );
};

export default OrderManagement;

