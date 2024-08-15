import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const ProductContext = createContext(null);

const ProductProvider = ({ children }) => {
  const [pLoading, setPLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const productInfo = {
    pLoading,
    setPLoading,
    allProducts,
    setAllProducts,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    search,
    setSearch,
    searchText,
    setSearchText,
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
