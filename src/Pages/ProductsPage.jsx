import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useProducts } from "../Context/ProductContext";

import { FetchProducts } from "../features/products/productsSlice";

import { useDispatch, useSelector } from "react-redux";

import styles from "./ProductsPage.module.css";
import Loader from "../components/Loader";
import Card from "../components/Card";
import {
  searchProducts,
  filterProducts,
  getinitialQuery,
} from "../Helpers/Helper";
import Searchbox from "../components/Searchbox";
import Sidebar from "../components/Sidebar";

function ProductsPage() {
  // const products = useProducts();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((store) => store.product);
  console.log(products);

  const [search, setSearch] = useState("");
  const [displayed, setDisplayed] = useState([]);
  const [querry, setQuerry] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(FetchProducts());
  }, []);



  useEffect(() => {
    setDisplayed(products);
    setQuerry(getinitialQuery(searchParams));
  }, [products]);

  

  useEffect(() => {
    setSearchParams(querry);
    setSearch(querry.search || "");
    let finalProducts = searchProducts(products, querry.search);
    finalProducts = filterProducts(finalProducts, querry.category);
    setDisplayed(finalProducts);
  }, [querry]);

  return (
    <>
      <Searchbox search={search} setSearch={setSearch} setQuerry={setQuerry} />
      <div className={styles.container}>
        {loading && <Loader />}
        <div className={styles.products}>
          {displayed.map((p) => (
            <Card key={p.id} data={p} />
          ))}
        </div>
        <Sidebar querry={querry} setQuerry={setQuerry} />
      </div>
    </>
  );
}

export default ProductsPage;
