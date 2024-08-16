import { GrLogout } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "./../../Hooks/useAuth";
import { FaSearch } from "react-icons/fa";
import useProducts from "../../Hooks/useProducts";

const Sidebar = ({ handleToggle, isActive }) => {
  const { userSignOut, setUser } = useAuth();

  const {
    handleSearch,
    setSearchText,
    searchText,
    maxPrice,
    minPrice,
    handleRangeChange,
    category,
    setCategory,
    brand,
    setBrand,
    sort,
    setSort,
    categoryList,
    brandList,
    maxPriceNumber,
  } = useProducts();
  const navigate = useNavigate();

  // Logout Handler
  const handleLogout = async () => {
    try {
      await userSignOut();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {/* Sidebar */}

      <div
        className={`md:flex flex-col justify-between overflow-x-hidden border-r border-gray-200 bg-slate-200 dark:bg-slate-800  space-y-6 px-2 py-3 z-20 min-h-[calc(100vh-90px)] w-64 ${
          isActive ? "translate-x-0 " : "-translate-x-full "
        } transform md:translate-x-0 md:static fixed top-0 left-0 transition-transform duration-200 ease-in-out`}>
        <div>
          <div className="flex justify-end pb-4">
            <button
              onClick={handleToggle}
              className="btn btn-circle btn-sm md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Filter Menu */}
          <div className="flex flex-col justify-between flex-1">
            {/* search */}
            <div>
              <p className="text-gray-600 font-medium mb-2">
                Search by Product Name
              </p>

              <form onSubmit={handleSearch}>
                <div className="relative w-full mb-3">
                  <input
                    type="text"
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                    name="search"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Search "
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 right-7 ">
                    <button type="submit">
                      <FaSearch />
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Sorting */}
            <div>
              <p className="text-gray-600 font-medium mb-2">Sort by</p>
              <select
                onChange={(e) => setSort(e.target.value)}
                defaultValue={sort}
                className="select select-bordered w-full rounded">
                <option value={""}></option>
                <option value={"new"}>New Arivals</option>
                <option value={"lth"}>Low to high</option>
                <option value={"htl"}>High to low</option>
              </select>
            </div>

            {/* Category */}

            <div className="mt-5">
              <div>
                <p className="text-gray-600 font-medium mb-2">Brand Name</p>

                <select
                  onChange={(e) => setBrand(e.target.value)}
                  defaultValue={brand}
                  className="select select-bordered w-full rounded">
                  <option value={""}></option>
                  {brandList?.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <p className="text-gray-600 font-medium mb-2">Category Name</p>

                <select
                  onChange={(e) => setCategory(e.target.value)}
                  defaultValue={category}
                  className="select select-bordered w-full rounded">
                  <option value={""}></option>
                  {categoryList?.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <p className=" font-medium">Price</p>
                <p>${maxPriceNumber}</p>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPriceNumber}
                  value={maxPrice}
                  onChange={handleRangeChange}
                  className="w-full max-w-xs"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}

          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-orange-100 rounded-md hover:text-gray-700 transition-colors duration-300 transform">
            <GrLogout className="w-5 h-5 dark:text-slate-300" />

            <span className="mx-4 dark:text-slate-300 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  handleToggle: PropTypes.func,
  isActive: PropTypes.bool,
};

export default Sidebar;
