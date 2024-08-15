import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";

const Main = () => {
  return (
    <div className="font-poppins">
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
