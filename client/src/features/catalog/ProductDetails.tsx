import { LoadingButton } from "@mui/lab";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import utils from "../../app/api/utils";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  addItemCestaAsync,
  removeItemCestaAsync,
} from "../cesta/cestaSlice";
import { fetchProductAsync, productsSelectors } from "./catalogSlice";

const styles = {
  primary: {
    color: "primary",
  },
  secondary: {
    color: "secondary",
  },
};

export default function ProductDetails() {
  const { cesta, status } = useAppSelector(state => state.cesta);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector(state => productsSelectors.selectById(state, id));
  const {status: productStatus} = useAppSelector(state => state.catalog);
  const [quantidade, setQuantidade] = useState(0);
  const item = cesta?.items.find(i => i.produtoId === product?.id);

  useEffect(() => {
    if (item) setQuantidade(item.quantidade);
    if(!product) dispatch(fetchProductAsync(parseInt(id)));

  }, [id, item, dispatch, product]);

  function alteraQuantidadeInput(event: any) {
    if (event.target.value >= 0) {
      setQuantidade(parseInt(event.target.value));
    }
  }

  function salvaAlteracaoInput() {
    // adiciona item ao carrinho caso a quantidade colocada no input seja maior a que já existe
    if (!item || quantidade > item.quantidade) {
      // Add produto ao carrinho
      const quantidadeAtualizada = item
        ? quantidade - item.quantidade
        : quantidade;
      dispatch(
        addItemCestaAsync({
          produtoId: product?.id!,
          quantidade: quantidadeAtualizada,
        })
      );
    } else {
      // Remove produto ao carrinho
      const quantidadeAtualizada = item.quantidade - quantidade;
      dispatch(
        removeItemCestaAsync({
          produtoId: product?.id!,
          quantidade: quantidadeAtualizada,
          name: "rem",
        })
      );
    }
  }

  if (productStatus.includes('pending')) return <LoadingComponent mensagem="Detalhes do produto" />;

  if (!product) return <NotFound />;
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3" color={styles.primary.color}>
          {product.name}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color={styles.secondary.color}>
          R$: {(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Descricao</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Estoque</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={alteraQuantidadeInput}
              variant="outlined"
              type="number"
              label="Quantidade no carrinho"
              fullWidth
              value={quantidade}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={
                item?.quantidade === quantidade || (!item && quantidade === 0)
              }
              onClick={salvaAlteracaoInput}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              loading={status.includes(
                "pending"
              )}
            >
              {item ? "Atualizar quantidade" : "Adicionar ao carrinho"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
