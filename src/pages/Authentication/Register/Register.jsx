import React from 'react';
import { useForm } from "react-hook-form";

import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { NavLink, useNavigate } from 'react-router';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password, data.name,data.photo);
      console.log("Firebase User:", result.user);

      const userInfo = {
        displayName: data.name,
        email: data.email,
       photoURL: data.photo,
        status: "unverified"
      };

      await axios.post("http://localhost:5000/api/users", userInfo);
      console.log("Saved to MongoDB");

      navigate('/'); // optional redirect
    } catch (error) {
      console.error("Error registering:", error);
    }
  };
//      const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm()
//   const {createUser}= useAuth()
//    const onSubmit = data =>{
//     console.log(data)
//    createUser(data.email, data.password, data.name,data.photo)
//    .then(
//     result =>{
//         console.log(result.user)
//     }
//    )
//    .catch(error => {
//     console.error(error)
//    })

// } 

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-left">Create an account now!</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
            <label className="label text-sm text-gray-600">Name</label>
          <input {...register("name",{required:true})}
            type="text"
            className="input input-bordered w-full"
            placeholder="Asif,Siam,Badol,Muna..."
          />
           <label className="label text-sm text-gray-600">Photo URL</label>
    <input {...register("photo", { required: true })} type="text" className="input input-bordered w-full" placeholder="https://example.com/photo.jpg" />
    {errors.photo && <p className='text-red-500'>Photo URL is required</p>}
  
          <label className="label text-sm text-gray-600">Email</label>
          <input {...register("email",{required:true})}
            type="email"
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {
            errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
          }
        </div>
        <div>
          <label className="label text-sm text-gray-600">Password</label>
          <input {...register("password",{required: true,
            minLength: 6
          })}
            type="password"
            className="input input-bordered w-full"
            placeholder="Password"
          />
          {
            errors.password?.type === 'required' && <p className='text-red-500'>Pasword is required</p>
          }
          {
            errors.password?.type === 'minLength' && <p className='text-red-500'>Pasword must be 6 characters or longer.</p>
          }
        </div>
       
        <button className="btn btn-primary w-full">Register</button>
        <p>Already have an account.Go to<NavLink to='/login' className='text-blue-800 font-bold underline'> login </NavLink>page</p>
        <SocialLogin></SocialLogin>
      </form>
    </div>
  );
};

export default Register;
