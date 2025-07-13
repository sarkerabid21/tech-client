import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowUp } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router";


const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [votedProducts, setVotedProducts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://tech-server-blush.vercel.app/api/trending-products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching trending products:", err));
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
    <div className="bg-pink-100  px-6 py-12 lg:py-10 lg:px-26">
      <h2 className="text-2xl lg:text-4xl font-extrabold text-center mb-10 text-gradient bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
         Trending Products
      </h2>

      <div  data-aos="fade-left" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => {
          const isOwner = user?.email === product.ownerEmail;
          const hasVoted = votedProducts.includes(product._id);

          return (
            <div
              key={product._id}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col"
            >
              <img
                src={product.productImage}
                alt={product.productName}
                className="rounded-2xl h-48 w-full object-cover mb-5"
              />
              <h3 className="text-2xl font-semibold mb-3 hover:text-indigo-600 transition-colors">
                <Link to={`/product/${product._id}`}>{product.productName}</Link>
              </h3>
              <p className="text-gray-600 flex-grow">{product.description.substring(0, 90)}...</p>

              <div className="flex flex-wrap gap-2 mt-4 mb-5">
                {product.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-indigo-600 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleUpvote(product._id)}
                disabled={isOwner || hasVoted}
                className={`cursor-pointer  mt-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full flex items-center justify-center gap-3 shadow-lg font-semibold hover:scale-105 transition-transform duration-200 disabled:opacity-50`}
              >
                <FaArrowUp className="text-white" />
                {product.upvotes} Upvote{product.upvotes !== 1 && "s"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/productPage")}
          className="cursor-pointer bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Show All Products
        </button>
      </div>
    </div>
  );
};

export default TrendingProducts;
