import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser } = useAuth();

  const handleRegistration = (data) => {
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });

      
  };

  return (
    <div className="px-6 py-10">
      {/* Title & Subtitle */}
      <h2 className="mb-2 font-bold text-4xl">Create an Account</h2>
      <p className="mb-8 text-gray-500">Register with ZapShift</p>

      <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="px-4 py-2 border rounded-lg focus:outline-none w-full"
            placeholder="Name"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">Name is required</span>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="px-4 py-2 border rounded-lg focus:outline-none w-full"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">Email is required</span>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
            })}
            className="px-4 py-2 border rounded-lg focus:outline-none w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <span className="text-red-500 text-sm">Password is required</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-red-500 text-sm">
              Password must be at least 6 characters
            </span>
          )}
          {errors.password?.type === "pattern" && (
            <span className="text-red-500 text-sm">
              Must contain an uppercase & a special character
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button className="bg-[#C7EA52] hover:bg-[#b7de45] py-3 rounded-lg w-full font-semibold text-gray-800 transition">
          Register
        </button>

        {/* Divider */}
        <div className="my-3 text-gray-400 text-center">Or</div>

        {/* Google Login */}

          <SocialLogin type="register"></SocialLogin>

        {/* <button className="flex justify-center items-center gap-2 py-3 border rounded-lg w-full">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5"
          />
          Register with Google
        </button> */}

        {/* Login Redirect */}
        <p className="mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <span className="font-semibold text-green-600 hover:underline cursor-pointer">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
