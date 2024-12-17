import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import { getCategories, deleteCategory } from '../../api/categoryApi';

const CategoryList = ({ onEditCategory }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      setError('Gagal mengambil data kategori');
      console.error('Fetch categories error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      setError('Gagal menghapus kategori');
      console.error('Delete category error:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ m: 2 }}>Daftar Kategori</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Kode</TableCell>
            <TableCell>Nama</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.ct_id}>
              <TableCell>{category.ct_code}</TableCell>
              <TableCell>{category.ct_name}</TableCell>
              <TableCell>
                <Button onClick={() => onEditCategory(category)}>Edit</Button>
                <Button onClick={() => handleDelete(category.ct_id)} color="secondary">Hapus</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoryList;

