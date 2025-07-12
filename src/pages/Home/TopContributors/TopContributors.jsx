import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopContributors = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://tech-server-blush.vercel.app/api/top-contributors")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching top contributors:", err));
  }, []);



  return (
    <div className="bg-pink-100 px-6 py-12 lg:py-10 lg:px-26">
      <h2 className="text-3xl font-bold text-center text-pink-700 mb-10">
        🏆 Top Contributors
      </h2>

      <div className='border rounded-3xl p-6 bg-pink-200 border-pink-200 shadow-inner'>
        <div  data-aos="flip-left" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user, i) => (
            <div
              key={user._id || i}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
            >
              <img
                src={user.ownerImage || "https://via.placeholder.com/150"}
                alt={user.ownerName}
                className="w-20 h-20 rounded-full mx-auto object-cover"
              />
              <h3 className="text-center text-lg font-semibold mt-4">
                {user.ownerName}
              </h3>
              <p className="text-center text-sm text-gray-500">{user._id}</p>
              <div className="flex justify-around mt-4 text-sm">
                <span>📄 {user.totalProducts} Products</span>
                <span>🔥 {user.totalUpvotes} Upvotes</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopContributors;
