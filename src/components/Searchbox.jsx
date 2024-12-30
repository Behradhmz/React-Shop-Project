import { ImSearch } from "react-icons/im";
import { creatQuerryObject } from "../Helpers/Helper";

import styles from "./Searchbox.module.css";

function Searchbox({ search, setQuerry, setSearch }) {
  const searchHandler = () => {
    setQuerry((querry) => creatQuerryObject(querry, { search }));
  };
  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value.toLocaleLowerCase().trim())}
      />
      <button onClick={searchHandler}>
        <ImSearch />
      </button>
    </div>
  );
}

export default Searchbox;
