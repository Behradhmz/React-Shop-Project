const shortenText = (text) => {
  return text.split(" ").slice(0, 3).join("");
};

const searchProducts = (products, search) => {
  if (!search) return products;
  const searchedProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search)
  );
  return searchedProducts;
};

const filterProducts = (products, category) => {
  if (!category) return products;
  const filteredProducts = products.filter((p) => p.category === category);
  return filteredProducts;
};

const creatQuerryObject = (currentQuerry, NewQuerry) => {
  if (NewQuerry.category === "all") {
    const { category, ...rest } = currentQuerry;
    return rest;
  }
  if (NewQuerry.search === "") {
    const { search, ...rest } = currentQuerry;
    return rest;
  }
  return {
    ...currentQuerry,
    ...NewQuerry,
  };
};

const getinitialQuery = (searchParams) => {
  const query = {};
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  if (category) query.category = category;
  if (search) query.search = search;
  return query;
};

// const sumProducts = (products) => {
//   const itemsCounter = products.reduce(
//     (counter, product) => counter + product.quantity,
//     0
//   );
//   const total = products.reduce(
//     (total, product) => total + product.price * product.quantity,
//     0
//   );
//   return { itemsCounter, total };
// };

const sumPirce = (products) => {
  return products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
};

const sumQuantity = (products) => {
  return products.reduce((counter, product) => counter + product.quantity, 0);
};

const productQuantity = (state, id) => {
  if (!state.selectedItems || !Array.isArray(state.selectedItems)) {
    return 0; // اگر selectedItems آرایه نباشد یا undefined باشد
  }

  const index = state.selectedItems.findIndex((item) => item.id === id);
  if (index === -1) {
    return 0;
  } else {
    return state.selectedItems[index].quantity;
  }
};

export {
  shortenText,
  searchProducts,
  filterProducts,
  creatQuerryObject,
  getinitialQuery,
  sumPirce,
  sumQuantity,
  productQuantity,
};
