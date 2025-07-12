import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [formData, setFormData] = useState({
    code: '',
    expiry: '',
    description: '',
    discount: '',
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch coupons from backend
  const fetchCoupons = async () => {
    try {
      const res = await axios.get('https://tech-server-blush.vercel.app/coupons');
      setCoupons(res.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`https://tech-server-blush.vercel.app/coupons/${editingId}`, formData);
        Swal.fire('Updated!', 'Coupon updated successfully.', 'success');
      } else {
        await axios.post('https://tech-server-blush.vercel.app/coupons', formData);
        Swal.fire('Saved!', 'Coupon added successfully.', 'success');
      }
      setFormData({ code: '', expiry: '', description: '', discount: '' });
      setEditingId(null);
      fetchCoupons();
    } catch (err) {
      console.error('Save error:', err);
      Swal.fire('Error', 'Something went wrong!', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://tech-server-blush.vercel.app/coupons/${id}`);
      fetchCoupons();
      Swal.fire('Deleted!', 'Coupon removed.', 'success');
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEdit = (coupon) => {
    setFormData(coupon);
    setEditingId(coupon._id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{editingId ? 'Edit Coupon' : 'Add Coupon'}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg shadow">
        <input name="code" type="text" placeholder="Coupon Code" value={formData.code} onChange={handleChange} required className="input input-bordered w-full" />
        <input name="expiry" type="date" placeholder="Expiry Date" value={formData.expiry} onChange={handleChange} required className="input input-bordered w-full" />
        <input name="description" type="text" placeholder="Coupon Description" value={formData.description} onChange={handleChange} required className="input input-bordered w-full" />
        <input name="discount" type="number" placeholder="Discount Amount" value={formData.discount} onChange={handleChange} required className="input input-bordered w-full" />
        <button type="submit" className="btn btn-primary col-span-full">{editingId ? 'Update' : 'Add'} Coupon</button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">All Coupons</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {coupons.map((coupon) => (
            <div key={coupon._id} className="border p-4 rounded-lg shadow bg-white">
              <h4 className="font-bold text-lg">{coupon.code}</h4>
              <p><span className="font-semibold">Expiry:</span> {coupon.expiry}</p>
              <p><span className="font-semibold">Description:</span> {coupon.description}</p>
              <p><span className="font-semibold">Discount:</span> {coupon.discount} TK</p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => handleEdit(coupon)} className="btn btn-sm btn-warning">Edit</button>
                <button onClick={() => handleDelete(coupon._id)} className="btn btn-sm btn-error">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coupon;
