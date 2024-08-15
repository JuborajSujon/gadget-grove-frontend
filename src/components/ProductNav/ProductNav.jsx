import { FaFilter } from "react-icons/fa";
import PropTypes from "prop-types";

const ProductNav = ({ handleToggle }) => {
  return (
    <div className="sticky top-0 left-0 right-0 z-10 w-full bg-slate-50 dark:bg-slate-700 border-b border-gray-200">
      {/* Small Screen Navbar */}
      <div className=" dark:bg-slate-700 text-gray-800 flex justify-between">
        {/* Humburger and Logo */}
        <div className="flex items-center md:hidden">
          <button
            onClick={handleToggle}
            className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200">
            <FaFilter className="h-5 w-5 dark:text-slate-300" />
          </button>
        </div>

        {/* Navbar */}
        <div className="flex-1 dark:bg-slate-700">
          <div className="navbar ">
            {/* Search Bar input field */}
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductNav.propTypes = {
  handleToggle: PropTypes.func,
  isActive: PropTypes.bool,
};

export default ProductNav;
