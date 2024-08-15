import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProductNav from "../../components/ProductNav/ProductNav";
const Home = () => {
  const [isActive, setActive] = useState(false);
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
        <div className="flex-grow p-4 overflow-auto">
          <div>
            <h1>Product List</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
