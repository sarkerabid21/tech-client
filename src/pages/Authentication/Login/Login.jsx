import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = data => {
    signIn(data.email, data.password)
      .then(result => {
        console.log('User logged in:', result.user);
        toast.success('🎉 Login successful!', {
          position: "top-right",
          autoClose: 1000,
        });
        setTimeout(() => navigate('/'), 1000); // wait for toast to finish
      })
      .catch(error => {
        console.error(error.message);
        toast.error(` ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="lg:w-full   mx-auto">
      <h1 className="text-4xl font-bold text-neutral mb-6">Login now!</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label text-sm text-gray-600">Email</label>
          <input {...register("email", { required: "Email Address is required" })} type="email" className="input input-bordered w-full" placeholder="Email" />
        </div>
        <div>
          <label className="label text-sm text-gray-600">Password</label>
          <input {...register("password", { required: true, minLength: 6 })} type="password" className="input input-bordered w-full" placeholder="Password" />
          {errors.password && <p className='text-red-500'>{errors.password.message || 'Password must be 6 characters or longer'}</p>}
        </div>
        <div className="text-right">
          <a className="link link-hover text-sm">Forgot password?</a>
        </div>
        <button className="cursor-pointer btn btn-neutral w-full">Login</button>
        <p>
          New to this website? Go to <a href="/register" className="text-blue-800 font-bold underline">register</a> page
        </p>
        <SocialLogin />
      </form>

      {/*  Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Login;
