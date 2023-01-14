import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";
import { formataMoeda } from "../../app/utils/util";

export default function CestaResumo() {
    const {cesta} = useStoreContext();
    const subtotal = cesta?.items.reduce((soma, item)=> soma + (item.preco * item.quantidade), 0) ?? 0
    const deliveryFee = subtotal! > 10000 ? 0 : 500;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell width='50%' align="right">{formataMoeda(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Frete grátis*</TableCell>
                            <TableCell width='50%' align="right">{formataMoeda(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell width='50%' align="right">{formataMoeda(subtotal! + deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Frete grátis para compras acima de R$ 100,00</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}