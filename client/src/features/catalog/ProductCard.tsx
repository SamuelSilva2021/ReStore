import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/product";
import { useState } from "react";
import utils from "../../app/api/utils";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/StoreContext";
import { formataMoeda } from "../../app/utils/util";
import { Link } from "react-router-dom";


interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const {setCesta} = useStoreContext();

  function handleAddItem(produtoId:number){
    setLoading(true)
    utils.Cesta.addItem(produtoId)
    .then(cesta => setCesta(cesta))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }

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
          {formataMoeda(product.price) }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={loading} 
                      onClick={() => handleAddItem(product.id)}
                      size="small">Add Carrinho
         
        </LoadingButton>
        <LoadingButton loading={loading} 
                      component={Link} to={`/catalog/${product.id}`}>Detalhes</LoadingButton>
      </CardActions>
    </Card>
  );
}
