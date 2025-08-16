import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get('/api/users');
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure]);

  const handleRoleChange = async (email, newRole) => {
    try {
      const res = await axiosSecure.patch(`/api/users/role/${email}`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        Swal.fire('Success!', `User is now a ${newRole}`, 'success');
        fetchUsers();
      }
    } catch (error) {
      console.error("Role update failed:", error);
      Swal.fire('Error!', 'Failed to update role.', 'error');
    }
  };

  return (
    <div className="p-6 min-h-screen dark:text-black bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100">
      <h2 className="text-3xl font-bold text-center mb-6">👥 Manage Users</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow-md">
        <table className="table w-full">
          <thead className="bg-sky-100  text-sky-900 font-semibold">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-sky-50 dark:text-black transition-all">
                <td>{index + 1}</td>
                <td>{user.displayName || 'N/A'}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td className="flex gap-2 justify-center flex-wrap">
                  {user.role !== 'moderator' && (
                    <button
                      onClick={() => handleRoleChange(user.email, 'moderator')}
                      className="btn btn-sm btn-info"
                    >
                      Make Moderator
                    </button>
                  )}
                  {user.role !== 'admin' && (
                    <button
                      onClick={() => handleRoleChange(user.email, 'admin')}
                      className="btn btn-sm btn-success"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {users.map((user, index) => (
          <div
            key={user._id}
            className="bg-white  shadow-md rounded-xl p-4 border border-sky-100"
          >
            <p className="font-semibold text-sky-900">#{index + 1} — {user.displayName || 'N/A'}</p>
            <p className="text-sm dark:text-black text-gray-600">{user.email}</p>
            <p className="mt-1 dark:text-black text-sm">Role: <span className="capitalize font-medium">{user.role}</span></p>
            <div className="flex gap-2 mt-3 flex-wrap">
              {user.role !== 'moderator' && (
                <button
                  onClick={() => handleRoleChange(user.email, 'moderator')}
                  className="btn btn-sm btn-info"
                >
                  Make Moderator
                </button>
              )}
              {user.role !== 'admin' && (
                <button
                  onClick={() => handleRoleChange(user.email, 'admin')}
                  className="btn btn-sm btn-success"
                >
                  Make Admin
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
