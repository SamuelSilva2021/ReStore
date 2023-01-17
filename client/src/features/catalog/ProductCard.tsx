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
import { LoadingButton } from "@mui/lab";
import { formataMoeda } from "../../app/utils/util";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addItemCestaAsync } from "../cesta/cestaSlice";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { status } = useAppSelector((state) => state.cesta);
  const dispatch = useAppDispatch();

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />

      <CardMedia
        sx={{ height: 140, backgroundSize: "contain" }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          {formataMoeda(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={status.includes('pendingItem' + product.id)}
          onClick={() => dispatch(addItemCestaAsync({ produtoId: product.id }))}
          size="small"
        >
          Add Carrinho
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`}>
          Detalhes
        </Button>
      </CardActions>
    </Card>
  );
}
