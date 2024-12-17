import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';

const CategoryManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleSaveCategory = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manajemen Kategori
      </Typography>
      {showForm ? (
        <CategoryForm
          category={editingCategory}
          onSave={handleSaveCategory}
          onCancel={() => {
            setShowForm(false);
            setEditingCategory(null);
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
            Tambah Kategori Baru
          </Button>
          <CategoryList onEditCategory={handleEditCategory} />
        </Box>
      )}
    </Container>
  );
};

export default CategoryManagement;

