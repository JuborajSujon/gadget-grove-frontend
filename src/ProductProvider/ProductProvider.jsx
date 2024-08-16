import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "./../Hooks/useAxiosPublic";

export const ProductContext = createContext(null);

const ProductProvider = ({ children }) => {
  const [pLoading, setPLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [minPrice, maxPrice] = priceRange || [0, 0];

  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("");

  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosPublic.get(
          `products?page=${currentPage}&size=${itemsPerPage}&search=${search}&category=${category}&brand=${brand}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}`
        );

        setAllProducts(res.data);
        setPLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [
    currentPage,
    itemsPerPage,
    search,
    searchText,
    axiosPublic,
    category,
    brand,
    minPrice,
    maxPrice,
    sort,
  ]);

  const numberOfPages = Math.ceil(allProducts.count / itemsPerPage);

  let pages = [];
  if (!pLoading) {
    pages = Array.from({ length: numberOfPages }, (_, index) => index + 1);
  } else {
    pages = Array.from({ length: 1 }, (_, index) => index + 1);
  }

  //  handle pagination button
  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  const handleRangeChange = (event) => {
    const value = parseInt(event.target.value);
    setPriceRange([0, value]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
    setCurrentPage(1);
  };

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
    handlePaginationButton,
    pages,
    handleSearch,
    numberOfPages,
    priceRange,
    setPriceRange,
    minPrice,
    maxPrice,
    handleRangeChange,
    category,
    setCategory,
    brand,
    setBrand,
    sort,
    setSort,
    categoryList,
    brandList,
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
