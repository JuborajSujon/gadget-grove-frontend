import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProductNav from "../../components/ProductNav/ProductNav";
import useProducts from "./../../Hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loading from "../../components/Loading/Loading";
const Home = () => {
  const [isActive, setActive] = useState(false);
  const {
    currentPage,
    handlePaginationButton,
    pages,
    numberOfPages,
    allProducts,
    ploading,
    productCount,
  } = useProducts();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div className="mt-16 px-4 flex max-w-[1540px] mx-auto font-poppins">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="relative">
        <Sidebar handleToggle={handleToggle} isActive={isActive} />
      </div>

      {/* dashboard dynamic content */}
      <div className="flex flex-col flex-grow overflow-hidden ">
        {/* navbar */}
        <ProductNav handleToggle={handleToggle} isActive={isActive} />
        <div className="flex-1 p-4 overflow-auto">
          <div className="flex flex-col min-h-[calc(100vh-200px)] justify-between ">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {/* product count */}
              <p>
                {" "}
                Products Found:{" "}
                <span className="text-blue-500">{productCount}</span>
              </p>
              {/* loader */}
              {ploading && <Loading />}

              {/* if there is no product */}
              {allProducts?.productsData?.length === 0 && !ploading && (
                <div className="text-center">
                  <h1 className="text-3xl font-bold">No Product Found</h1>
                </div>
              )}
              {/* product card */}
              {allProducts?.productsData?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* pagination */}

            <div className="">
              <div className="flex items-center justify-center mt-10">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePaginationButton(currentPage - 1)}
                  className="px-4 py-2 mx-1 capitalize bg-orange-400 text-slate-900 font-semibold rounded-md cursor-not-allowed hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
                  <div className="flex items-center -mx-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-1 rtl:-scale-x-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                      />
                    </svg>

                    <span className="mx-1">previous</span>
                  </div>
                </button>

                {/* Numbers */}
                {pages.map((btnNum) => (
                  <button
                    onClick={() => handlePaginationButton(btnNum)}
                    key={btnNum}
                    className={`hidden ${
                      currentPage === btnNum
                        ? "bg-blue-500 text-white"
                        : "bg-orange-400"
                    } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}>
                    {btnNum}
                  </button>
                ))}

                <button
                  disabled={currentPage === numberOfPages}
                  onClick={() => handlePaginationButton(currentPage + 1)}
                  className="px-4 py-2 mx-1 text-slate-900 font-semibold transition-colors duration-300 transform bg-orange-400 rounded-md  hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200 pr-7">
                  <div className="flex items-center -mx-1">
                    <span className="mx-1">Next</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-1 rtl:-scale-x-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
