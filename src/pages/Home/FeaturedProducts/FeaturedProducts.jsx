
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowUp } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [votedProducts, setVotedProducts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://tech-server-blush.vercel.app/api/featured-products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching featured products:", err));
  }, []);

  const handleUpvote = async (productId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (votedProducts.includes(productId)) return;

    try {
      const res = await axios.patch(
        `https://tech-server-blush.vercel.app/api/upvote/${productId}`,
        { email: user.email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        setProducts((prev) =>
          prev.map((product) =>
            product._id === productId
              ? { ...product, upvotes: product.upvotes + 1 }
              : product
          )
        );
        setVotedProducts([...votedProducts, productId]);
      }
    } catch (error) {
      console.error("Upvote failed:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 lg:py-10 lg:px-26  px-6 py-12">
      <h2 className="lg:text-4xl text-2xl text-amber-100 font-bold text-center mb-8"> Featured Products</h2>

      <div  data-aos="fade-right"  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const isOwner = user?.email === product.ownerEmail;
          const hasVoted = votedProducts.includes(product._id);

          return (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={product.productImage}
                alt={product.productName}
                className="h-40 w-full object-cover rounded-xl"
              />
              <h3 className="text-lg font-semibold mt-4 hover:text-indigo-600 transition">
  <Link to={`/product/${product._id}`}>
    {product.productName}
  </Link>
</h3>

              <div className="flex flex-wrap gap-2 mt-3">
                {product.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="badge badge-outline text-xs border-gray-300 text-gray-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

             <div className="mt-5 flex justify-center">
  <button
    onClick={() => handleUpvote(product._id)}
    disabled={isOwner || hasVoted}
    className={`px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer duration-300 shadow-lg
      ${
        isOwner || hasVoted
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
      }`}
  >
    <FaArrowUp className="text-white text-base" />
    <span>{product.upvotes} Upvote{product.upvotes !== 1 && "s"}</span>
  </button>
</div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
