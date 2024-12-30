import { TbChecklist } from "react-icons/tb";
import { FaHashtag } from "react-icons/fa";
import { BsPatchCheck } from "react-icons/bs";

import styles from "./BasketSideBar.module.css";
import { useDispatch } from "react-redux";
import { checkout } from "../features/Cart/cartSlice";

function BasketSideBar({ state }) {
  console.log(state.quantity);
  const dispatch = useDispatch();
  return (
    <div className={styles.sidebar}>
      <div>
        <TbChecklist />
        <p>Total:</p>
        <span>{state.total}</span>
      </div>
      <div>
        <FaHashtag />
        <p>Quantity:</p>
        <span>{state.quantity}</span>
      </div>
      <div>
        <BsPatchCheck />
        <p>Status:</p>
        <span>{!state.chekout && "Pending ..."}</span>
      </div>
      <button onClick={() => dispatch(checkout())}>CheCkOut</button>
    </div>
  );
}

export default BasketSideBar;
