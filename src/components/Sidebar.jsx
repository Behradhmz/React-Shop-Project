import { FaListUl } from "react-icons/fa";

import { creatQuerryObject } from "../Helpers/Helper";
import { categories } from "../constants/list";

import styles from "./Sidebar.module.css";

function Sidebar({ querry, setQuerry }) {
  const categoryHandler = (event) => {
    const { tagName } = event.target;
    const category = event.target.innerText.toLowerCase();

    if (tagName !== "LI") return;
    setQuerry((querry) => creatQuerryObject(querry, { category }));
  };
  return (
    <div className={styles.sidebar}>
      <div>
        <FaListUl />
        <p>Categories</p>
      </div>
      <ul onClick={categoryHandler}>
        {categories.map((item) => (
          <li
            key={item.id}
            className={
              item.type.toLocaleLowerCase() === querry.category
                ? styles.selected
                : null
            }
          >
            {item.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
