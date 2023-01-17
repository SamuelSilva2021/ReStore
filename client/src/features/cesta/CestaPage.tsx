import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
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
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { formataMoeda } from "../../app/utils/util";
import CestaResumo from "./CestaResumo";
import { addItemCestaAsync, removeItemCestaAsync } from "./cestaSlice";

export default function CestaPage() {
  const { cesta, status } = useAppSelector((state) => state.cesta);
  const dispatch = useAppDispatch();

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
                      loading={status.includes(
                        "pendingRemoveItem" + item.produtoId + "rem"
                      )}
                      onClick={() =>
                        dispatch(
                          removeItemCestaAsync({
                            produtoId: item.produtoId,
                            quantidade: 1,
                            name: "rem",
                          })
                        )
                      }
                      color="error"
                      sx={{ borderRadius: 2 }}
                    >
                      <Remove />
                    </LoadingButton>
                    {item.quantidade}
                    <LoadingButton
                      loading={status === "pendingAddItem" + item.produtoId}
                      onClick={() =>
                        dispatch(
                          addItemCestaAsync({
                            produtoId: item.produtoId,
                            quantidade: 1,
                          })
                        )
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
                        status === "pendingRemoveItem" + item.produtoId + "del"
                      }
                      onClick={() =>
                        dispatch(
                          removeItemCestaAsync({
                            produtoId: item.produtoId,
                            quantidade: item.quantidade,
                            name: "del",
                          })
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
