import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaImage } from "react-icons/fa6";
import { motion } from "framer-motion";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegistration = (data) => {
    setLoading(true);
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        // Prepare image for ImgBB upload
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

        axios
          .post(image_API_URL, formData)
          .then((res) => {
            const userProfile = {
              displayName: data.name,
              photoURL: res.data.data.url,
            };

            updateUserProfile(userProfile)
              .then(() => {
                setLoading(false);
                Swal.fire({
                  icon: "success",
                  title: "Account Created!",
                  text: "Welcome to Zap-Shift Express Logistics.",
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
                Swal.fire({
                  icon: "error",
                  title: "Profile Update Failed",
                  text: error.message,
                  confirmButtonColor: "#03373D",
                });
              });
          })
          .catch((error) => {
            setLoading(false);
            Swal.fire({
              icon: "error",
              title: "Image Upload Failed",
              text: "Could not upload profile picture. Please try again.",
              confirmButtonColor: "#03373D",
            });
          });
      })
      .catch((error) => {
        setLoading(false);
        let errorMessage = "Registration failed. Please try again.";
        if (error.code === "auth/email-already-in-use") {
          errorMessage = "This email is already registered.";
        }

        Swal.fire({
          icon: "error",
          title: "Registration Error",
          text: errorMessage,
          confirmButtonColor: "#03373D",
        });
      });
  };

  return (
    <div className="mx-auto px-2 py-4 w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white shadow-xl p-6 sm:p-8 border border-gray-100 rounded-3xl"
      >
        {/* Header */}
        <div className="mb-6 text-left">
          <h2 className="font-extrabold text-secondary text-3xl sm:text-4xl">
            Create Account
          </h2>
          <p className="mt-1.5 text-gray-500 text-sm">
            Join Zap-Shift for seamless logistics management
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
          
          {/* Name Field */}
          <div>
            <label className="block mb-1.5 font-semibold text-secondary text-sm">
              Full Name
            </label>
            <div className="relative">
              <span className="top-1/2 left-3.5 absolute text-gray-400 -translate-y-1/2">
                <FaUser />
              </span>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="bg-gray-50/50 focus:bg-white py-3 pr-4 pl-10 border border-gray-200 focus:border-secondary rounded-xl focus:outline-none w-full text-secondary text-sm transition-all"
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <span className="block mt-1 font-medium text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Photo Field */}
          <div>
            <label className="block mb-1.5 font-semibold text-secondary text-sm">
              Profile Photo
            </label>
            <div className="relative">
              <span className="top-1/2 left-3.5 absolute text-gray-400 -translate-y-1/2">
                <FaImage />
              </span>
              <input
                type="file"
                accept="image/*"
                {...register("photo", { required: "Photo is required" })}
                className="bg-gray-50/50 focus:bg-white file:bg-secondary/10 file:hover:bg-secondary/20 file:mr-3 py-2 pr-4 pl-10 border border-gray-200 focus:border-secondary file:border-0 rounded-xl file:rounded-lg focus:outline-none w-full file:font-semibold text-secondary file:text-secondary text-sm transition-all"
              />
            </div>
            {errors.photo && (
              <span className="block mt-1 font-medium text-red-500 text-xs">
                {errors.photo.message}
              </span>
            )}
          </div>

          {/* Email Field */}
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

          {/* Password Field */}
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
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                    message: "Must contain an uppercase & special character",
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary/90 disabled:opacity-50 shadow-md mt-2 py-3.5 rounded-xl w-full font-bold text-secondary active:scale-95 transition-all cursor-pointer"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Register"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-gray-200 border-t"></div>
            <span className="px-3 text-gray-400 text-xs uppercase">Or</span>
            <div className="flex-grow border-gray-200 border-t"></div>
          </div>

          {/* Social Login */}
          <SocialLogin type="register" />

          {/* Login Redirect */}
          <p className="mt-6 text-gray-600 text-sm text-center">
            Already have an account?{" "}
            <Link
              state={location.state}
              to="/login"
              className="font-bold text-secondary hover:underline"
            >
              Login
            </Link>
          </p>

        </form>
      </motion.div>
    </div>
  );
};

export default Register;