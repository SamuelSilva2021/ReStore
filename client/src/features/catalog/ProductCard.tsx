import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/product";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Preview, ViewTimeline, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";


interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [value, setValue] = useState<number | null>(2);
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor:'secondary.main'}}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title= {product.name}
        titleTypographyProps={{
          sx:{fontWeight:'bold', color:'primary.main'}
        }}
      />

      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain'}}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color='secondary' variant="h5">
          R$ {(product.price /100).toFixed(2) }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
      <IconButton color="primary" aria-label="add to shopping cart">
        <AddShoppingCartIcon />
      </IconButton>
      <IconButton 
      color="primary" 
      aria-label="Details"
      component={Link} to={`/catalog/${product.id}`}
      >
        <Visibility/>
      </IconButton>
      </CardActions>
    </Card>
  );
}
