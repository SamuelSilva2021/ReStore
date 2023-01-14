import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton, Masonry } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import utils from "../../app/api/utils";
import { useStoreContext } from "../../app/context/StoreContext";
import { formataMoeda } from "../../app/utils/util";
import CestaResumo from "./CestaResumo";

export default function CestaPage() {
  const { cesta, setCesta, removeItem } = useStoreContext();
  const [status, setStatus] = useState({
    loading: true,
    name: "",
  });

  const btnStyles = {
    btnRemove: {
      color: "error",
      textDecoration: "none",
      borderRadius: 10,

      "&:hover": {
        backgroundColor: "#FA8072",
        color: "white",
      },
    },
  };

  function handleAddItem(produtoId: number, name: string) {
    setStatus({ loading: true, name });
    utils.Cesta.addItem(produtoId)
      .then((cesta) => setCesta(cesta))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

  function handleRemoveItem(produtoId: number, quantidade = 1, name: string) {
    setStatus({ loading: true, name });
    utils.Cesta.removeItem(produtoId, quantidade)
      .then(() => removeItem(produtoId, quantidade))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

  if (!cesta)
    return <Typography variant="h3">Seu carrinho está vazio</Typography>;

  return (
    <Grid container spacing={1}>
      {/* Itens */}
      <Grid item xs={8.5}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell align="right">Preço</TableCell>
                <TableCell align="center">Quantidade</TableCell>
                <TableCell align="right">Subtotal</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cesta.items.map((item: any) => (
                <TableRow
                  key={item.produtoId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box display="flex" alignItems="center">
                      <img
                        src={item.pictureUrl}
                        alt={item.nome}
                        style={{ height: 50, marginRight: 20 }}
                      />
                      <span>{item.nome}</span>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {formataMoeda(item.preco)}
                  </TableCell>
                  <TableCell align="center">
                    <LoadingButton
                      loading={
                        status.loading && status.name === "rem" + item.produtoId
                      }
                      onClick={() =>
                        handleRemoveItem(
                          item.produtoId,
                          1,
                          "rem" + item.produtoId
                        )
                      }
                      color="error"
                      sx={{ borderRadius: 2 }}
                    >
                      <Remove />
                    </LoadingButton>
                    {item.quantidade}
                    <LoadingButton
                      loading={
                        status.loading && status.name === "add" + item.produtoId
                      }
                      onClick={() =>
                        handleAddItem(item.produtoId, "add" + item.produtoId)
                      }
                      color="success"
                      sx={{ borderRadius: 2 }}
                    >
                      <Add />
                    </LoadingButton>
                  </TableCell>
                  <TableCell align="right">
                    {formataMoeda(item.preco * item.quantidade)}
                  </TableCell>
                  <TableCell align="right">
                    <LoadingButton
                      loading={
                        status.loading && status.name === "del" + item.produtoId
                      }
                      onClick={() =>
                        handleRemoveItem(
                          item.produtoId,
                          item.quantidade,
                          "del" + item.produtoId
                        )
                      }
                      color="error"
                      sx={{ borderRadius: 2 }}
                    >
                      <Delete />
                    </LoadingButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* Sumario */}
      <Grid item xs={3.5}>
        <CestaResumo />
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          size="large"
          fullWidth
        >
          Checkout
        </Button>
      </Grid>
    </Grid>
  );
}
