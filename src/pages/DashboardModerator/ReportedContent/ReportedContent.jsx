import React, { useEffect, useState } from "react";
import { FaTrash, FaEye } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const ReportedContent = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://tech-server-blush.vercel.app/api/reported-products"
      );
      setReports(res.data);
    } catch (err) {
      console.error("Error fetching reported products:", err);
      setError("Failed to load reported products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(
          `https://tech-server-blush.vercel.app/api/reported-products/${id}`
        );
        setReports((prev) => prev.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "The product has been removed.", "success");
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Failed to delete the product.", "error");
      }
    }
  };

  return (
    <div className="px-4 min-h-full py-10 lg:px-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100">
      <h2 className="text-3xl font-bold text-center mb-6 text-red-600">
        Reported Products
      </h2>

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-6">{error}</div>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-xl bg-white">
          <table className="table table-zebra">
            <thead className="bg-amber-200 text-gray-800 text-lg">
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Reported By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {reports.length > 0 ? (
                  reports.map((product, index) => (
                    <motion.tr
                      key={product._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="dark:text-pink-500">{index + 1}</td>
                      <td className="font-semibold dark:text-pink-500">
                        {product.productName}
                      </td>
                      <td className="dark:text-pink-500">{product.reportedBy?.email}</td>
                      <td className="flex flex-wrap gap-2">
                        <button
                          className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                          onClick={() =>
                            navigate(`/product/${product.originalProductId}`)
                          }
                        >
                          <FaEye /> View
                        </button>
                        <button
                          className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => handleDelete(product._id)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-500 py-6">
                      No reported content found.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportedContent;
