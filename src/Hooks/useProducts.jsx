import { useContext } from "react";
import { ProductContext } from "../ProductProvider/ProductProvider";

const useProducts = () => {
  const productInfo = useContext(ProductContext);
  return productInfo;
};

export default useProducts;
