import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import loadingLottie from '../../../assets/loading.json';
import Lottie from 'lottie-react';

const UpdateProduct = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/api/products/${id}`).then((res) => {
      setProduct(res.data);
      setTags(res.data.tags || []);
    });
  }, [id, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedProduct = {
      productName: form.productName.value,
      productImage: form.productImage.value,
      description: form.description.value,
      externalLink: form.externalLink.value,
      tags,
    };

    try {
      const res = await axiosSecure.put(`/api/products/${id}`, updatedProduct);
      if (res.data.modifiedCount > 0) {
        Swal.fire("✅ Success", "Product updated successfully!", "success");
        navigate("/dashboard/myProduct");
      } else {
        Swal.fire("ℹ️ No Changes", "Nothing was updated.", "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Something went wrong!", "error");
    }
  };

  if (!product) return <Lottie className='my-10' animationData={loadingLottie} loop={true} />

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          ✏️ Update Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block font-semibold mb-1">Product Name *</label>
            <input
              type="text"
              name="productName"
              defaultValue={product.productName}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Product Image */}
          <div>
            <label className="block font-semibold mb-1">Product Image URL *</label>
            <input
              type="text"
              name="productImage"
              defaultValue={product.productImage}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">Description *</label>
            <textarea
              name="description"
              defaultValue={product.description}
              className="textarea textarea-bordered w-full"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block font-semibold mb-1">Tags (comma separated)</label>
            <input
              type="text"
              defaultValue={tags.join(", ")}
              onChange={(e) =>
                setTags(e.target.value.split(",").map((tag) => tag.trim()))
              }
              className="input input-bordered w-full"
            />
          </div>

          {/* External Link */}
          <div>
            <label className="block font-semibold mb-1">External Link</label>
            <input
              type="url"
              name="externalLink"
              defaultValue={product.externalLink}
              className="input input-bordered w-full"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full transition duration-300"
          >
            🚀 Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
