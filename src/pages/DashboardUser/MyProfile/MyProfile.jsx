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

  if (!userInfo)
    return <Lottie className='my-10 w-40 h-40 mx-auto' animationData={loadingLottie} loop={true} />

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 w-full max-w-xs sm:max-w-sm md:max-w-md text-center">
        <div className="relative mb-4">
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto rounded-full ring-4 ring-purple-300 overflow-hidden shadow-lg">
            <img
              src={userInfo.photoURL || "https://via.placeholder.com/150"}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800">{userInfo.name}</h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-500">{userInfo.email}</p>

        <div
          className={`mt-4 px-3 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2.5 inline-block rounded-full text-xs sm:text-sm md:text-base font-semibold ${
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
            className="mt-6 cursor-pointer w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-2 sm:py-2.5 md:py-3 rounded-full transition duration-300 text-sm sm:text-base md:text-lg"
          >
           Membership Subscribe
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
