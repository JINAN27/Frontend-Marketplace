import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import { getOrders, deleteOrder } from '../../api/orderApi';

const OrderList = ({ onEditOrder }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      setError('Gagal mengambil data pesanan');
      console.error('Fetch orders error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      fetchOrders();
    } catch (error) {
      setError('Gagal menghapus pesanan');
      console.error('Delete order error:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ m: 2 }}>Daftar Pesanan</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID Pesanan</TableCell>
            <TableCell>ID Produk</TableCell>
            <TableCell>Jumlah</TableCell>
            <TableCell>Tanggal Dibuat</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.or_id}>
              <TableCell>{order.or_id}</TableCell>
              <TableCell>{order.or_pd_id}</TableCell>
              <TableCell>{order.or_amount}</TableCell>
              <TableCell>{new Date(order.or_created_at).toLocaleString()}</TableCell>
              <TableCell>
                <Button onClick={() => onEditOrder(order)}>Edit</Button>
                <Button onClick={() => handleDelete(order.or_id)} color="secondary">Hapus</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderList;

