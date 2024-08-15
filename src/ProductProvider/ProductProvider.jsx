import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const ProductContext = createContext(null);

const ProductProvider = ({ children }) => {
  const [pLoading, setPLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const productInfo = {
    pLoading,
    setPLoading,
    products,
    setProducts,
  };

  return (
    <ProductContext.Provider value={productInfo}>
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node,
};

export default ProductProvider;
