import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaTruckFast, FaShieldHalved, FaClock } from "react-icons/fa6";
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
          text: `Signed in successfully as ${result.user?.displayName || "User"}`,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        setLoading(false);
        let errorMessage = "Failed to sign in. Please check your credentials.";
        if (error.code === "auth/invalid-credential") {
          errorMessage = "Incorrect email or password. Please try again.";
        } else if (error.code === "auth/user-not-found") {
          errorMessage = "No account found with this email.";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Incorrect password.";
        }

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: errorMessage,
          confirmButtonColor: "#03373D",
        });
      });
  };

  return (
    <div className="flex justify-center items-center px-4 sm:px-6 lg:px-8 py-8 min-h-[85vh]">
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-white shadow-2xl border border-gray-100 rounded-3xl w-full max-w-5xl overflow-hidden">
        
        {/* Left Side: Animated Brand Illustration Banner (Kept for rich visual UI) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="hidden relative flex lg:flex flex-col justify-between lg:col-span-5 bg-secondary p-8 sm:p-12 overflow-hidden text-white"
        >
          {/* Background Glow Accents */}
          <div className="top-0 right-0 absolute bg-primary/20 blur-3xl rounded-full w-48 h-48 pointer-events-none" />
          <div className="-bottom-10 -left-10 absolute bg-primary/10 blur-3xl rounded-full w-48 h-48 pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md mb-6 px-4 py-1.5 rounded-full font-bold text-primary text-xs uppercase tracking-wider">
              <FaTruckFast /> Fast & Reliable Logistics
            </div>
            <h2 className="font-extrabold text-white text-3xl xl:text-4xl leading-tight">
              Manage Your Deliveries with <span className="text-primary">Zap-Shift</span>
            </h2>
            <p className="mt-4 text-gray-300 text-sm leading-relaxed">
              Real-time parcel tracking, instant COD payouts, and smooth courier management all in one place.
            </p>
          </div>

          {/* Feature Highlights Card */}
          <div className="space-y-4 my-8">
            <div className="flex items-center gap-3.5 bg-white/5 backdrop-blur-sm p-3.5 border border-white/10 rounded-2xl">
              <div className="bg-primary/20 p-2.5 rounded-xl text-primary shrink-0">
                <FaShieldHalved className="text-lg" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Secure Authentication</h4>
                <p className="text-gray-400 text-xs">Your data and transactions are fully encrypted.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white/5 backdrop-blur-sm p-3.5 border border-white/10 rounded-2xl">
              <div className="bg-primary/20 p-2.5 rounded-xl text-primary shrink-0">
                <FaClock className="text-lg" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">24/7 Merchant Support</h4>
                <p className="text-gray-400 text-xs">Instant help for your parcel and order queries.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-white/10 border-t text-gray-400 text-xs">
            © {new Date().getFullYear()} Zap-Shift Express Logistics. All rights reserved.
          </div>
        </motion.div>

        {/* Right Side: Animated Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col justify-center lg:col-span-7 p-6 sm:p-10 lg:p-12"
        >
          {/* Header */}
          <div className="mb-6 lg:text-left text-center">
            <h2 className="font-extrabold text-secondary text-3xl sm:text-4xl">
              Welcome Back
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              Sign in to access your Zap-Shift account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            
            {/* Email Input */}
            <div>
              <label className="block mb-1.5 font-semibold text-secondary text-sm">
                Email Address
              </label>
              <div className="relative">
                <span className="top-1/2 left-3.5 absolute text-gray-400 -translate-y-1/2">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className="bg-gray-50/50 focus:bg-white py-3 pr-4 pl-10 border border-gray-200 focus:border-secondary rounded-xl focus:outline-none w-full text-secondary text-sm transition-all"
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && (
                <span className="block mt-1 font-medium text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block mb-1.5 font-semibold text-secondary text-sm">
                Password
              </label>
              <div className="relative">
                <span className="top-1/2 left-3.5 absolute text-gray-400 -translate-y-1/2">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="bg-gray-50/50 focus:bg-white py-3 pr-10 pl-10 border border-gray-200 focus:border-secondary rounded-xl focus:outline-none w-full text-secondary text-sm transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="top-1/2 right-3.5 absolute focus:outline-none text-gray-400 hover:text-secondary -translate-y-1/2"
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
              <a className="font-semibold text-secondary text-xs hover:underline cursor-pointer">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 disabled:opacity-50 shadow-md py-3.5 rounded-xl w-full font-bold text-secondary active:scale-95 transition-all cursor-pointer"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Login"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-gray-200 border-t"></div>
              <span className="px-3 text-gray-400 text-xs uppercase">Or</span>
              <div className="flex-grow border-gray-200 border-t"></div>
            </div>

            {/* Social Login */}
            <SocialLogin type="login" />

            {/* Register Redirect */}
            <p className="mt-6 text-gray-600 text-sm text-center">
              Don’t have an account?{" "}
              <Link
                state={location.state}
                to="/register"
                className="font-bold text-secondary hover:underline"
              >
                Register
              </Link>
            </p>

          </form>
        </motion.div>

      </div>
    </div>
  );
};

export default Login;