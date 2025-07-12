import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
// import { Link } from 'react-router-dom'; // ✅ correct import
import { Link } from 'react-router';
const ProductReview = () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosSecure.get('/api/all-products')
      .then(res => {
        const sorted = res.data.sort((a, b) => {
          const statusOrder = { pending: 1, accepted: 2, featured: 3, rejected: 4 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
        setProducts(sorted);
      });
  }, [axiosSecure]);

  const updateStatus = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/api/products/status/${id}`, { status });
      if (res.data.modifiedCount > 0) {
        Swal.fire("✅ Success", `Marked as ${status}`, "success");
        setProducts(prev =>
          prev.map(p => p._id === id ? { ...p, status } : p)
        );
      }
    } catch (error) {
      Swal.fire("❌ Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">🧾 Product Review</h2>
      <div className="overflow-x-auto rounded-xl">
        <table className="table w-full shadow-xl rounded-3xl bg-white">
          <thead className="bg-gray-400 text-gray-100 text-sm uppercase tracking-wide">
            <tr>
              <th>#</th>
              <th className="text-left">Product Name</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p._id} className="hover:bg-gray-50 transition-all">
                <td className="text-center">{i + 1}</td>
                <td>{p.productName}</td>
                <td>
                  <span className={`badge 
                    ${p.status === 'pending' && 'badge-warning'}
                    ${p.status === 'accepted' && 'badge-success'}
                    ${p.status === 'featured' && 'badge-info'}
                    ${p.status === 'rejected' && 'badge-error'} 
                    capitalize`}>
                    {p.status}
                  </span>
                </td>
                <td className="flex flex-wrap gap-2 justify-center">
                  <Link to={`/product/${p._id}`} className="btn btn-sm btn-info">View</Link>

                  <button
                    onClick={() => updateStatus(p._id, 'featured')}
                    className="btn cursor-pointer btn-sm btn-accent"
                    disabled={p.status === 'rejected'}
                  >
                    Make Featured
                  </button>

                  <button
                    onClick={() => updateStatus(p._id, 'accepted')}
                    className="btn btn-sm btn-success"
                    disabled={p.status === 'accepted' || p.status === 'rejected'}
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => updateStatus(p._id, 'rejected')}
                    className="btn btn-sm btn-error"
                    disabled={p.status === 'rejected' || p.status === 'accepted'}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-6">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductReview;
