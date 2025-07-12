// ✅ FRONTEND: ReportedContent.jsx
import React, { useEffect, useState } from "react";
import { FaTrash, FaEye } from "react-icons/fa";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const ReportedContent = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get("https://tech-server-blush.vercel.app/api/reported-products");
      setReports(res.data);
    } catch (error) {
      console.error("Error fetching reported products:", error);
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
        await axios.delete(`https://tech-server-blush.vercel.app/api/reported-products/${id}`);
        setReports(reports.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "The product has been removed.", "success");
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error", "Failed to delete the product.", "error");
      }
    }
  };

  return (
    <div className="px-4 min-h-full py-10 lg:px-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100">
      <h2 className="text-3xl font-bold text-center mb-6 text-red-600">Reported Products</h2>
      <div className="overflow-x-auto shadow rounded-xl bg-white">
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
            {reports.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td className="font-semibold">{product.productName}</td>
                <td>{product.reportedBy?.email}</td>
                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-info text-white"
                    onClick={() => navigate(`/product/${product.originalProductId}`)}
                  >
                    <FaEye /> View
                  </button>
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => handleDelete(product._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {reports.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No reported content found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedContent;
