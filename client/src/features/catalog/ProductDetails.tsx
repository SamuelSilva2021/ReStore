import { Divider, Grid, List, ListItem, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import utils from "../../app/api/utils";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
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
        utils.Catalog.details(parseInt(id))
        .then(response => setProduct(response))
        .catch(erro => console.log(erro))
        .finally(() => setLoading(false))
    }, [id])

    if(loading) return <LoadingComponent mensagem="Detalhes do produto"/>

    if(!product) return <NotFound/>
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