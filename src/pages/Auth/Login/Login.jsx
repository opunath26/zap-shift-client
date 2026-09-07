import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaTruckFast } from "react-icons/fa6";
import { motion } from "framer-motion";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { SignInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    setLoading(true);
    SignInUser(data.email, data.password)
      .then((result) => {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Welcome Back!",
          text: `Signed in as ${result.user?.displayName || "User"}`,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate(location?.state || "/");
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password.",
          confirmButtonColor: "#03373D",
        });
      });
  };

  return (
    <div className="flex justify-center items-center p-4 w-full min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-xl p-8 border border-gray-100 rounded-3xl w-full max-w-md"
      >
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 bg-[#03373D]/10 mb-3 px-3 py-1 rounded-full font-bold text-[#03373D] text-xs">
            <FaTruckFast className="text-[#03373D]" /> ZapShift Courier
          </div>
          <h2 className="font-extrabold text-[#03373D] text-3xl tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-1 text-gray-500 text-xs">
            Sign in to access your ZapShift account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          
          {/* Email Field */}
          <div>
            <label className="block mb-1 font-bold text-[#03373D] text-xs">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="top-1/2 left-3.5 absolute text-gray-400 text-sm -translate-y-1/2" />
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="bg-gray-50/50 focus:bg-white py-3 pr-4 pl-10 border border-gray-200 focus:border-[#03373D] rounded-xl focus:outline-none w-full text-[#03373D] text-sm transition-all"
                placeholder="name@example.com"
              />
            </div>
            {errors.email && (
              <span className="block mt-1 font-medium text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 font-bold text-[#03373D] text-xs">
              Password
            </label>
            <div className="relative">
              <FaLock className="top-1/2 left-3.5 absolute text-gray-400 text-sm -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="bg-gray-50/50 focus:bg-white py-3 pr-10 pl-10 border border-gray-200 focus:border-[#03373D] rounded-xl focus:outline-none w-full text-[#03373D] text-sm transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="top-1/2 right-3.5 absolute text-gray-400 hover:text-[#03373D] -translate-y-1/2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <span className="block mt-1 font-medium text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="#" className="font-semibold text-[#03373D] text-xs hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#C7EA52] hover:bg-[#b8dd42] disabled:opacity-50 shadow-md py-3.5 rounded-xl w-full font-bold text-[#03373D] active:scale-[0.99] transition-all cursor-pointer"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-gray-200 border-t"></div>
            <span className="px-3 font-medium text-gray-400 text-xs uppercase">
              Or
            </span>
            <div className="flex-grow border-gray-200 border-t"></div>
          </div>

          {/* Social Login */}
          <SocialLogin type="login" />

          {/* Register Redirect */}
          <p className="mt-6 text-gray-600 text-xs text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              state={location.state}
              className="font-bold text-[#03373D] hover:underline"
            >
              Register
            </Link>
          </p>

        </form>
      </motion.div>
    </div>
  );
};

export default Login;