import React from "react";
import { useForm } from "react-hook-form";
import { WithContext as ReactTagInput } from "react-tag-input";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
           Add a New Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block font-medium mb-1">Product Name *</label>
            <input
              type="text"
              {...register("productName", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter product name"
            />
            {errors.productName && (
              <p className="text-red-500 text-sm">Product name is required.</p>
            )}
          </div>

          {/* Product Image */}
          <div>
            <label className="block font-medium mb-1">Product Image URL *</label>
            <input
              type="text"
              {...register("productImage", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter image URL"
            />
            {errors.productImage && (
              <p className="text-red-500 text-sm">Image URL is required.</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description *</label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Enter product description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">Description is required.</p>
            )}
          </div>

          {/* Owner Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">Owner Name</label>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Owner Email</label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Owner Image</label>
              <input
                type="text"
                value={user?.photoURL}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block font-medium mb-1">Tags</label>
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
            <label className="block font-medium mb-1">External Link</label>
            <input
              type="url"
              {...register("externalLink")}
              className="input input-bordered w-full"
              placeholder="https://yourproductsite.com"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full cursor-pointer text-lg">
             Submit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
