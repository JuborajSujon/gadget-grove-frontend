import { GrLogout } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "./../../Hooks/useAuth";

const Sidebar = ({ handleToggle, isActive }) => {
  const { userSignOut, setUser } = useAuth();
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
        className={`md:flex flex-col justify-between overflow-x-hidden border-r border-gray-200 bg-slate-200 dark:bg-slate-800  space-y-6 px-2 py-3 z-20 min-h-screen w-64 ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } transform md:translate-x-0 md:static fixed top-0 left-0 h-full transition-transform duration-200 ease-in-out`}>
        <div>
          <div className="flex justify-end border-b border-gray-200  pb-4">
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
            {/* Filter Menu */}
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
