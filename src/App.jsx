import { Route, Routes } from "react-router-dom";
import ProductsPage from "./Pages/ProductsPage";
import DetailsPage from "./Pages/DetailsPage";
import Chekout from "./Pages/Chekout";
import PagenotFound404 from "./Pages/PagenotFound404";
// import ProductProvider from "./Context/ProductContext";
// import CartProvider from "./Context/Cartcontext";
import Layout from "./Layout/Layout";

function App() {
  return (
    // <CartProvider>
      // <ProductProvider>
        <Layout>
          <Routes>
            <Route index element={<ProductsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<DetailsPage />} />
            <Route path="/chekout" element={<Chekout />} />
            <Route path="/*" element={<PagenotFound404 />} />
          </Routes>
        </Layout>
      // </ProductProvider>
    // </CartProvider>
  );
}

export default App;
