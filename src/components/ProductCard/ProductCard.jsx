import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function MealCard({ product }) {
  const {
    _id,
    product_name,
    product_brand,
    product_image,
    product_category,
    product_disc,
    price,
    rating,
    published_date,
  } = product;

  let date = new Date(published_date);
  let formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  let time = date.toLocaleTimeString();

  return (
    <div className="group rounded-lg dark:text-slate-300 bg-white dark:bg-slate-900 shadow hover:shadow-md dark:hover:shadow-md dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden  m-3 flex flex-col max-w-sm">
      <div className="relative h-64">
        <img
          className="w-full h-full object-cover group-hover:scale-105 duration-300"
          src={product_image}
          alt={product_name}
        />
      </div>

      <div className="p-6 flex-grow  flex flex-col justify-between">
        <div className="pb-4">
          <h3
            className="text-base font-medium text-slate-900
                 dark:text-slate-200 dark:hover:text-orange-500">
            {product_name}
          </h3>
          <p className="text-sm">
            <span className="text-sm font-medium ">Brand: </span>
            {product_brand}
          </p>
          <p className="text-sm">
            <span className="text-sm font-medium ">Category : </span>
            {product_category}
          </p>
        </div>

        <div>
          <p className="text-sm">
            {product_disc.slice(0, 150)} ...{" "}
            <span className="text-blue-500 cursor-pointer">read more</span>
          </p>
        </div>
        <ul className=" flex justify-between items-center list-none mt-4">
          <li>
            <p className="text-sm dark:text-slate-300 font-medium">
              <span className=" dark:text-slate-300 mr-2">Price:</span>$
              <span className="font-chakraPetch">
                {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </p>
          </li>

          <li>
            <ul className="text-sm font-medium  list-none">
              <li
                className="inline text-slate-900 
              dark:text-slate-300 ">
                <span className=" mr-2">Rating:</span>
                <span className="font-chakraPetch">{rating}</span>
              </li>
            </ul>
          </li>
        </ul>

        <div className="mt-2">
          <p className="text-sm font-medium">
            Published Date: {formattedDate} at {time}
          </p>
        </div>

        <div className=" mt-4">
          <Link
            // to={`/meal-details/${_id}`}
            className="btn text-sm h-10 min-h-10  bg-orange-400 hover:bg-orange-500 border-orange-400 hover:orange-yellow-500 text-slate-900 rounded-md ">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

MealCard.propTypes = {
  product: PropTypes.object,
};
