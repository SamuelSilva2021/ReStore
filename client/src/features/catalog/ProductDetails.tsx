import { Divider, Grid, List, ListItem, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";

const styles = {
    primary:{
        color:'primary'
    },
    secondary:{
        color:'secondary'
    }
}

export default function ProductDetails(){
    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/${id}`)
        .then(response =>  setProduct(response.data))
        .catch(erro => console.log(erro))
        .finally(() => setLoading(false))
    }, [id])

    if(loading) return <h3>Loading...</h3>

    if(!product) return <h3>Produto não encontrado</h3>
    return(
      <Grid container spacing={6}>
        <Grid item xs={6}>
            <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}}/>
        </Grid>
        <Grid item xs={6}>
            <Typography variant='h3' color={styles.primary.color} >{product.name}</Typography>
            <Divider sx={{mb: 2}}/>
            <Typography variant='h4' color={styles.secondary.color} >R$: {(product.price/100).toFixed(2)}</Typography>
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
        </Grid>
      </Grid>
    )
}