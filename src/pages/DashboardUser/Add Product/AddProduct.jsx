import React from "react";
import { useForm } from "react-hook-form";
import { WithContext as ReactTagInput } from "react-tag-input";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddProduct = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [tags, setTags] = React.useState([]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const onSubmit = async (data) => {
    const productData = {
      productName: data.productName,
      productImage: data.productImage,
      description: data.description,
      ownerName: user?.displayName,
      ownerEmail: user?.email,
      ownerImage: user?.photoURL,
      externalLink: data.externalLink,
      tags: tags.map((t) => t.text),
      timestamp: new Date(),
      upvotes: 0,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/api/products", productData);
      if (res.data.insertedId) {
        Swal.fire("✅ Success!", "Product added successfully!", "success");
        reset();
        setTags([]);
        navigate("/dashboard/myProduct");
      }
    } catch (err) {
      Swal.fire("❌ Error!", "Something went wrong!", "error");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 flex items-center justify-center px-4 py-6 sm:py-10">
      <div className="w-full max-w-md sm:max-w-2xl lg:max-w-3xl p-6 sm:p-8 lg:p-10 bg-white rounded-2xl shadow-xl">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 text-gray-800">
          Add a New Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block dark:text-black font-medium mb-1 text-sm sm:text-base">Product Name *</label>
            <input
              type="text"
              {...register("productName", { required: true })}
              className="input dark:text-black input-bordered w-full"
              placeholder="Enter product name"
            />
            {errors.productName && (
              <p className="text-red-500 dark:text-black text-xs sm:text-sm">Product name is required.</p>
            )}
          </div>

          {/* Product Image */}
          <div>
            <label className="block font-medium mb-1 text-sm sm:text-base dark:text-black">Product Image URL *</label>
            <input
              type="text"
              {...register("productImage", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter image URL"
            />
            {errors.productImage && (
              <p className="text-red-500 text-xs sm:text-sm dark:text-black">Image URL is required.</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1 text-sm sm:text-base">Description *</label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full min-h-[100px]"
              placeholder="Enter product description"
            />
            {errors.description && (
              <p className="text-red-500 text-xs sm:text-sm">Description is required.</p>
            )}
          </div>

          {/* Owner Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1 text-sm sm:text-base">Owner Name</label>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="input input-bordered w-full bg-gray-100 dark:text-black text-gray-600"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm sm:text-base">Owner Email</label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="input input-bordered w-full bg-gray-100 text-gray-600 dark:text-black"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm sm:text-base dark:text-black">Owner Image</label>
              <input
                type="text"
                value={user?.photoURL}
                readOnly
                className="input input-bordered w-full bg-gray-100 text-gray-600 dark:text-black"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block font-medium mb-1 text-sm sm:text-base dark:text-black">Tags</label>
            <ReactTagInput
              tags={tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              placeholder="Press enter to add a tag"
              inputFieldPosition="bottom"
              autocomplete
            />
          </div>

          {/* External Link */}
          <div>
            <label className="block font-medium mb-1 text-sm sm:text-base">External Link</label>
            <input
              type="url"
              {...register("externalLink")}
              className="input input-bordered w-full"
              placeholder="https://yourproductsite.com"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full cursor-pointer text-sm sm:text-base lg:text-lg py-2 sm:py-3"
          >
            Submit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
