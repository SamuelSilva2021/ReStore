import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import utils from "../../app/api/utils";
import LoadingComponent from "../../app/layout/LoadingComponent";


export default function Catalog() {
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    utils.Catalog.list()
    .then(products => setProducts(products))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }, []);

  if(loading) return <LoadingComponent mensagem="Produtos"/>

  return (
    <>
      <ProductList products={products}/>
    </>
  );
}
