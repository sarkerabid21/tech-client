// ✅ FRONTEND: ProductPage.jsx (All Products Page)
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowUp } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [votedProducts, setVotedProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  const fetchProducts = () => {
    axios
      .get(`http://localhost:5000/api/products/accepted`, {
        params: { search, page }
      })
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error("Error fetching accepted products:", err));
  };

  const handleUpvote = async (productId) => {
    if (!user) return navigate("/login");
    if (votedProducts.includes(productId)) return;

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/upvote/${productId}`,
        { email: user.email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        setProducts((prev) =>
          prev.map((p) =>
            p._id === productId ? { ...p, upvotes: p.upvotes + 1 } : p
          )
        );
        setVotedProducts([...votedProducts, productId]);
      }
    } catch (error) {
      console.error("Upvote failed:", error);
    }
  };

  const handleReport = async (product) => {
  if (!user) return navigate("/login");

  const { _id, ...restProduct } = product;

  try {
    const res = await axios.post("http://localhost:5000/api/report", {
      ...restProduct,
      originalProductId: _id,
      reportedBy: {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      },
      reportType: "product",
      reportedAt: new Date(),
    });

    if (res.data.insertedId) {
      Swal.fire("✅ Report Submitted!", "Admin will review it.", "success");
    }
  } catch (error) {
    console.error("Error submitting report:", error);
    Swal.fire("❌ Error", "Could not report this product", "error");
  }
};


  return (
    <div className="py-10 bg-conic-180 from-indigo-600 via-indigo-50 to-indigo-600 px-4 lg:py-10 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-indigo-700">
          All Accepted Products
        </h2>

        <div className="mb-6 text-center">
          <input
            type="text"
            placeholder="Search by tag..."
            className="input input-bordered w-full rounded-3xl  max-w-md"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="h-44 w-full object-cover rounded-xl"
                />

                <h3 className="text-lg font-bold mt-4 hover:text-indigo-600 transition">
                  <Link to={`/product/${product._id}`}>{product.productName}</Link>
                </h3>

                <p className="text-gray-600 mt-2 text-sm">
                  {product.description?.slice(0, 80)}...
                </p>

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

                <div className="mt-4 flex justify-between items-center gap-2">
                  <button
                    onClick={() => handleUpvote(product._id)}
                    className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 px-4 rounded-lg shadow-md hover:scale-105 transition disabled:opacity-50 flex items-center gap-2"
                    disabled={isOwner || hasVoted}
                  >
                    <FaArrowUp /> {product.upvotes} Upvote{product.upvotes !== 1 && "s"}
                  </button>

                  <a
                    href={product.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-sm"
                  >
                    Visit Site
                  </a>

                  <button
                    onClick={() => handleReport(product)}
                    className="text-sm text-red-500 underline"
                  >
                    🚩 Report
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex justify-center items-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="btn btn-outline rounded-full font-bold bg-amber-100"
          >
            Prev
          </button>
          <span className="text-lg font-semibold">Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="btn btn-outline rounded-full font-bold bg-amber-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
