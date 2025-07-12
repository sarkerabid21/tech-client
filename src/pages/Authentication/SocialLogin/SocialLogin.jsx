import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router';
import axios from 'axios';

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const userInfo = {
        name: user.displayName,
        role: 'user',
        email: user.email,
        photoURL: user.photoURL,
        status: "unverified",
      };

      // MongoDB তে save করো
      await axios.post("https://tech-server-blush.vercel.app/api/users", userInfo);

      // তারপর redirect করো home/dashboard এ
      navigate("/");
    } catch (error) {
      console.error("Google Sign-in Error:", error);
    }
  };

  return (
    <div className='text-center space-y-6'>
      <p>OR</p>
      <button
        onClick={handleGoogleSignIn}
        className="btn cursor-pointer bg-red-500 text-white border-[#e5e5e5] w-full"
      >
        <FcGoogle className='text-xl mr-2' />
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
