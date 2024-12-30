import { Link } from "react-router-dom";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
// import { useCart } from "../Context/Cartcontext";
import styles from "./Layout.module.css";
import { useSelector } from "react-redux";

function Layout({ children }) {
  // const [state] = useCart();
  const state = useSelector((store) => store.cart);
  return (
    <>
      <header className={styles.header}>
        <Link to="/products">BrdShope</Link>
        <Link to="/chekout">
          <div>
            <PiShoppingCartSimpleBold />
            {!!state.itemsCounter && <span>{state.itemsCounter}</span>}
          </div>
        </Link>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Develop By Behrad With &#10084;</p>
      </footer>
    </>
  );
}

export default Layout;
