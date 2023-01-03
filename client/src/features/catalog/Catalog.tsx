import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";


export default function Catalog() {
  
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/Products")
      .then((request) => request.json())
      .then((response) => setProducts(response));
  }, []);

  return (
    <>
      <ProductList products={products}/>
    </>
  );
}
