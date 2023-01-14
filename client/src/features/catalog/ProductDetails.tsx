import { LoadingButton } from "@mui/lab";
import {
  Divider,
  Grid,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import utils from "../../app/api/utils";
import { useStoreContext } from "../../app/context/StoreContext";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";

const styles = {
  primary: {
    color: "primary",
  },
  secondary: {
    color: "secondary",
  },
};

export default function ProductDetails() {
  const { cesta, setCesta, removeItem } = useStoreContext();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantidade, setQuantidade] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const item = cesta?.items.find((i) => i.produtoId === product?.id);

  useEffect(() => {
    if (item) setQuantidade(item.quantidade);

    utils.Catalog.details(parseInt(id))
      .then((response) => setProduct(response))
      .catch((erro) => console.log(erro))
      .finally(() => setLoading(false));
  }, [id, item]);

  function alteraQuantidadeInput(event:any){
    if(event.target.value >= 0){
      setQuantidade(parseInt(event.target.value));
    }
  }

  function salvaAlteracaoInput(){
    setSubmitting(true);

    // adiciona item ao carrinho caso a quantidade colocada no input seja maior a que já existe
    if(!item || quantidade > item.quantidade){
      // Add produto ao carrinho     
      const quantidadeAtualizada = item ? quantidade - item.quantidade : quantidade;
      utils.Cesta.addItem(product?.id!, quantidadeAtualizada)
      .then(cesta => setCesta(cesta))
      .catch(error => console.log(error))
      .finally(() => setSubmitting(false))
    }else{
      // Remove produto ao carrinho     
      const quantidadeAtualizada = item.quantidade - quantidade;
      utils.Cesta.removeItem(product?.id!, quantidadeAtualizada)
      .then(cesta => removeItem(product?.id!, quantidadeAtualizada))
      .catch(error => console.log(error))
      .finally(() => setSubmitting(false))
    }
  }

  if (loading) return <LoadingComponent mensagem="Detalhes do produto" />;

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
                    type='number'
                    label='Quantidade no carrinho'
                    fullWidth
                    value={quantidade}
                />                    
            </Grid>
            <Grid item xs={6}>
                <LoadingButton
                    disabled={item?.quantidade === quantidade || !item && quantidade === 0}
                    onClick={salvaAlteracaoInput}
                    sx={{height: '55px'}}
                    color = 'primary'
                    size="large"
                    variant="contained"
                    fullWidth
                    loading={submitting}
                >
                    {item ? 'Atualizar quantidade' : 'Adicionar ao carrinho'}
                </LoadingButton>
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
