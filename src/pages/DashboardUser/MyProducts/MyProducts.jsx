import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/api/products?email=${user.email}`)
        .then((res) => setMyProducts(res.data))
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/api/products/${id}`).then(() => {
          setMyProducts((prev) => prev.filter((product) => product._id !== id));
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        });
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/dashboard/updateProduct/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 text-center">
          🧾 My Submitted Products
        </h2>

        {myProducts.length === 0 ? (
          <p className="text-center text-gray-600 text-sm sm:text-base">
            You haven’t posted any products yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg">
            <table className="table w-full text-xs sm:text-sm lg:text-base text-left text-gray-600">
              <thead className="bg-indigo-100 text-indigo-800 font-semibold">
                <tr>
                  <th className="p-2 sm:p-3">Product Name</th>
                  <th className="p-2 sm:p-3 text-center">Votes</th>
                  <th className="p-2 sm:p-3 text-center">Status</th>
                  <th className="p-2 sm:p-3 text-center">Update</th>
                  <th className="p-2 sm:p-3 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {myProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-indigo-50 transition duration-150"
                  >
                    <td className="p-2 sm:p-3">{product.productName}</td>
                    <td className="p-2 sm:p-3 text-center">{product.upvotes || 0}</td>
                    <td className="p-2 sm:p-3 text-center">
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium uppercase ${
                          product.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : product.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="p-2 sm:p-3 text-center">
                      <button
                        onClick={() => handleUpdate(product._id)}
                        className="px-2 sm:px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs sm:text-sm cursor-pointer"
                      >
                        Update
                      </button>
                    </td>
                    <td className="p-2 sm:p-3 text-center">
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-2 sm:px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-xs sm:text-sm cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProduct;
