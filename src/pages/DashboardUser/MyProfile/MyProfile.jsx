import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import loadingLottie from '../../../assets/loading.json';
import Lottie from 'lottie-react';


const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/api/users/${user.email}`).then((res) => {
        setUserInfo(res.data);
      });
    }
  }, [user, axiosSecure]);

  const handleSubscribe = () => {
    navigate("/dashboard/payment");
  };

  if (!userInfo) return <Lottie className='my-10' animationData={loadingLottie} loop={true} />

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm text-center">
        <div className="relative mb-4">
          <div className="w-32 h-32 mx-auto rounded-full ring-4 ring-purple-300 overflow-hidden shadow-lg">
            <img
              src={userInfo.photoURL || "https://via.placeholder.com/150"}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800">{userInfo.name}</h2>
        <p className="text-gray-500 text-sm">{userInfo.email}</p>

        <div
          className={`mt-4 px-4 py-2 inline-block rounded-full text-sm font-semibold ${
            userInfo.status === "verified"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          Status: {userInfo.status === "verified" ? "Verified ✅" : "Unverified ⛔"}
        </div>

        {userInfo.status === "unverified" && (
          <button
            onClick={handleSubscribe}
            className="mt-6 cursor-pointer w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-2 rounded-full transition duration-300"
          >
           Membership Subscribe
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
