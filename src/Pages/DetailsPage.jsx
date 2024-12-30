import { Link, useParams } from "react-router-dom";
// import { useProductDetails } from "../Context/ProductContext";
import Loader from "../components/Loader";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { SiOpenproject } from "react-icons/si";
import styles from "./DetailsPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FetchProducts } from "../features/products/productsSlice";

function DetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector((store) =>
    store.product.products.find((i) => i.id === +id)
  );

  useEffect(() => {
    dispatch(FetchProducts());
  }, []);

  if (!productDetails) return <Loader />;

  return (
    <div className={styles.container}>
      <img src={productDetails.image} />
      <div className={styles.information}>
        <h3 className={styles.title}>{productDetails.title}</h3>
        <p className={styles.description}>{productDetails.description}</p>
        <p className={styles.category}>
          <SiOpenproject />
          {productDetails.category}
        </p>
        <div>
          <span className={styles.price}>
            <IoMdPricetag />
            {productDetails.price}$
          </span>
          <Link to="/products">
            <FaArrowLeft />
            <span>Back To BrdShope</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
