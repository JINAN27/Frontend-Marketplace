import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const Product = ({ product, onEdit, onDelete }) => (
  <Card>
    <CardMedia
      component="img"
      height="140"
      image={`http://localhost:5000${product.pd_image}`}
      alt={product.pd_name}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {product.pd_name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Code: {product.pd_code}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Price: ${product.pd_price}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Quantity: {product.pd_quantity}
      </Typography>
      <Button onClick={() => onEdit(product)}>Edit</Button>
      <Button onClick={() => onDelete(product.pd_id)}>Delete</Button>
    </CardContent>
  </Card>
);

export default Product;

