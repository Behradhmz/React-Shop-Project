import { useSelector } from "react-redux";
import BasketCart from "../components/BasketCart";
import BasketSideBar from "../components/BasketSideBar";
// import { useCart } from "../Context/Cartcontext";

import styles from "./Chekout.module.css";

function Chekout() {
  // const [state, dispatch] = useCart();
  const state = useSelector((store) => store.cart);

  if (!state.itemsCounter) {
    return (
      <div className={styles.container}>
        <p>Empty</p>
      </div>
    );
  }

  

  return (
    <div className={styles.container}>
      <div>
        <BasketSideBar state={state} />
      </div>
      <div className={styles.products}>
        {state.selectedItems.map((product) => (
          <BasketCart key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
}

export default Chekout;
