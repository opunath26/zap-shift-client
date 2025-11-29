import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { SignInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    SignInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || '/')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="px-6 py-10">
      {/* Title */}
      <h2 className="mb-2 font-bold text-4xl">Welcome Back</h2>
      <p className="mb-8 text-gray-500">Login to your account</p>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">

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
            {...register("password", { required: true, minLength: 6 })}
            className="px-4 py-2 border rounded-lg focus:outline-none w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <span className="text-red-500 text-sm">Password is required</span>
          )}
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <a className="text-green-600 text-sm hover:underline cursor-pointer">
            Forgot password?
          </a>
        </div>

        {/* Login Button */}
        <button className="bg-[#C7EA52] hover:bg-[#b7de45] py-3 rounded-lg w-full font-semibold text-gray-800 transition">
          Login
        </button>

        {/* Divider */}
        <div className="my-3 text-gray-400 text-center">Or</div>

        {/* Google Login */}

          <SocialLogin type="login"></SocialLogin>

       

        {/* Register Redirect */}
        <p className="mt-4 text-gray-600 text-sm">
          Don’t have an account?{" "}
          <span className="font-semibold text-green-600 hover:underline cursor-pointer">
            <Link
             state={location.state}
             to="/register">Register</Link>
          </span>
        </p>

      </form>
    </div>
  );
};

export default Login;
