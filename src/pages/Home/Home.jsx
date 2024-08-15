import { Helmet } from "react-helmet-async";
const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <h2 className="text-3xl font-bold underline">This is Home</h2>
    </div>
  );
};

export default Home;
