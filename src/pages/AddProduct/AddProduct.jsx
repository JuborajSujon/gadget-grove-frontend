import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { imageUpload } from "../../api";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";

const AddProduct = () => {
  const [spinning, setSpinning] = useState(false);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const {
      product_name,
      product_brand,
      product_image,
      product_category,
      product_disc,
      price,
      rating,
    } = data;

    try {
      setSpinning(true);
      // upload image and get url
      let image;
      const imageData = product_image[0];
      const image_data = await imageUpload(imageData);

      if (image_data.success) {
        image = image_data.data.display_url;

        const menuItem = {
          product_name,
          product_brand,
          product_image: image,
          price: parseFloat(price),
          product_disc,
          product_category,
          rating: parseFloat(rating),
          published_date: parseInt(new Date().getTime()),
          admin: {
            name: user.displayName,
            email: user.email,
          },
        };

        const menuRes = await axiosPublic.post("/product", menuItem);

        if (menuRes.data.insertedId) {
          toast.success("Product added successfully", {
            autoClose: 1500,
          });
          reset();
          setSpinning(false);
        } else {
          toast.error("Failed to add product, please try again", {
            autoClose: 2000,
          });
        }
      } else {
        setSpinning(false);
        toast.error("Image upload failed, please try again", {
          autoClose: 2000,
        });
      }
    } catch (err) {
      setSpinning(false);
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Add Meal | Dashboard</title>
      </Helmet>

      <section className="p-6 mt-20 bg-slate-200 dark:bg-slate-800">
        <h2 className="text-2xl font-bold text-center mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 grid-y-3">
            {/* Product Name */}
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-slate-600 text-sm dark:text-slate-300 font-bold mb-2"
                htmlFor="grid-password">
                Product Name
              </label>
              <input
                {...register("product_name", { required: true })}
                type="text"
                className="border-0 px-3 py-1.5 placeholder-slate-300 dark:placeholder:text-slate-500  text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Product Name"
              />
              {errors.product_name && (
                <p className="text-red-500 text-sm">Product name is required</p>
              )}
            </div>

            {/* Price */}
            <div className="relative w-full mb-3">
              <label
                className="block uppercase dark:text-slate-300 text-slate-600 text-sm font-bold mb-2"
                htmlFor="grid-password">
                Price
              </label>
              <input
                {...register("price", { required: true })}
                type="number"
                step="any"
                className="border-0 px-3 py-1.5 placeholder-slate-300 dark:placeholder:text-slate-500 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Price"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">Price is required</p>
              )}
            </div>

            {/* Brand Name */}
            <div className="relative w-full mb-3">
              <label
                className="block uppercase dark:text-slate-300 text-slate-600 text-sm font-bold mb-2"
                htmlFor="grid-password">
                Brand Name
              </label>
              <input
                {...register("product_brand", { required: true })}
                type="text"
                className="border-0 px-3 py-1.5 placeholder-slate-300 dark:placeholder:text-slate-500 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Brand Name"
              />
              {errors.product_brand && (
                <p className="text-red-500 text-sm">Brand name is required</p>
              )}
            </div>

            {/* Product Category */}
            <div className="relative w-full mb-3">
              <label
                className="block uppercase dark:text-slate-300 text-slate-600 text-sm font-bold mb-2"
                htmlFor="grid-password">
                Product Category
              </label>
              <input
                {...register("product_category", { required: true })}
                type="text"
                className="border-0 px-3 py-1.5 placeholder-slate-300 dark:placeholder:text-slate-500 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Category Name"
              />
              {errors.product_category && (
                <p className="text-red-500 text-sm">
                  Product Category is required
                </p>
              )}
            </div>

            {/* Rating */}
            <div className="relative w-full mb-3">
              <label
                className="block uppercase dark:text-slate-300 text-slate-600 text-sm font-bold mb-2"
                htmlFor="grid-password">
                Rating
              </label>
              <input
                {...register("rating", { required: true })}
                type="number"
                step="any"
                className="border-0 px-3 py-1.5 placeholder-slate-300 dark:placeholder:text-slate-500 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Rating"
              />
              {errors.rating && (
                <p className="text-red-500 text-sm">Rating is required</p>
              )}
            </div>

            {/* image upload */}
            <div className="relative w-full mb-3">
              <label
                className="block uppercase dark:text-slate-300 text-slate-600 text-sm font-bold mb-2"
                htmlFor="grid-password">
                Product Image
              </label>
              <input
                {...register("product_image", { required: true })}
                type="file"
                className="border-0 px-3 py-1.5 placeholder-slate-300 dark:placeholder:text-slate-500 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Product Image"
              />
              {errors.product_image && (
                <p className="text-red-500 text-sm">
                  Product Image is required
                </p>
              )}
            </div>
          </div>

          {/* short description */}
          <div className="relative w-full mb-3">
            <label
              className="block uppercase dark:text-slate-300 text-slate-600 text-sm font-bold mb-2"
              htmlFor="grid-password">
              Product Description
            </label>
            <textarea
              {...register("product_disc", { required: true })}
              type="text"
              rows="3"
              className="border-0 px-3 py-1.5 placeholder-slate-300 dark:placeholder:text-slate-500 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Short Description"></textarea>
          </div>

          {/* submit button */}
          <div className="text-center mt-6">
            {spinning ? (
              <button
                disabled
                className="bg-slate-800 text-white  hover:bg-slate-700 text-sm font-bold uppercase px-6 py-1 rounded shadow hover:shadow-lg outline-none border-2 border-transparent dark:bg-slate-500 hover:border-2 hover:border-yellow-400 focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
                <span className="loading loading-dots loading-md"></span>
              </button>
            ) : (
              <input
                value={"Add Product"}
                type="submit"
                className="bg-slate-800 text-white  hover:bg-slate-700 text-sm font-bold uppercase px-6 py-2 rounded shadow hover:shadow-lg outline-none border-2 border-transparent dark:bg-slate-500 hover:border-2 hover:border-yellow-400 focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              />
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddProduct;
