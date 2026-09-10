import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaImage, FaTruckFast } from "react-icons/fa6";
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

  const from = location?.state?.from?.pathname || "/";

  const handleRegistration = async (data) => {
    setLoading(true);
    const profileImg = data.photo[0];

    try {
      // 1. Firebase Auth - Create User
      await registerUser(data.email, data.password);

      // 2. ImgBB Upload
      const formData = new FormData();
      formData.append("image", profileImg);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
      
      const imgRes = await axios.post(image_API_URL, formData);
      const photoURL = imgRes.data.data.url;

      // 3. Update Firebase Profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: photoURL,
      });

      // 4. Save User Info to MongoDB via Express Backend
      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL: photoURL,
        role: "user",
      };

      await axios.post("http://localhost:3000/users", userInfo);

      setLoading(false);

      // 5. Success Notification & Redirect
      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Welcome to ZapShift Express Logistics.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate(from, { replace: true });
      });

    } catch (error) {
      setLoading(false);
      console.error("Registration Process Error:", error);
      
      let errorMessage = "Registration failed. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered.";
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || errorMessage,
        confirmButtonColor: "#03373D",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-1 py-2 w-full"
    >
      {/* Header */}
      <div className="mb-5">
        <div className="inline-flex items-center gap-1.5 bg-[#03373D]/10 mb-2 px-3 py-1 rounded-full font-bold text-[#03373D] text-xs">
          <FaTruckFast className="text-[#03373D]" /> ZapShift Logistics
        </div>
        <h2 className="font-extrabold text-[#03373D] text-2xl sm:text-3xl tracking-tight">
          Create Account
        </h2>
        <p className="mt-1 text-gray-500 text-xs sm:text-sm">
          Join ZapShift for seamless logistics management
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleRegistration)} className="space-y-3.5">
        
        {/* Full Name */}
        <div>
          <label className="block mb-1 font-bold text-[#03373D] text-xs">
            Full Name
          </label>
          <div className="relative">
            <FaUser className="top-1/2 left-3.5 absolute text-gray-400 text-sm -translate-y-1/2" />
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="bg-gray-50/60 focus:bg-white py-2.5 pr-4 pl-10 border border-gray-200 focus:border-[#03373D] rounded-xl focus:outline-none w-full text-[#03373D] text-sm transition-all"
              placeholder="John Doe"
            />
          </div>
          {errors.name && (
            <span className="block mt-1 font-medium text-red-500 text-xs">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Profile Photo */}
        <div>
          <label className="block mb-1 font-bold text-[#03373D] text-xs">
            Profile Photo
          </label>
          <div className="relative">
            <FaImage className="top-1/2 left-3.5 absolute text-gray-400 text-sm -translate-y-1/2" />
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: "Photo is required" })}
              className="bg-gray-50/60 hover:file:bg-[#03373D]/20 focus:bg-white file:bg-[#03373D]/10 file:mr-3 file:px-3 py-1.5 file:py-1 pr-4 pl-10 border border-gray-200 focus:border-[#03373D] file:border-0 rounded-xl file:rounded-lg focus:outline-none w-full file:font-semibold text-gray-600 file:text-[#03373D] file:text-xs text-sm transition-all cursor-pointer"
            />
          </div>
          {errors.photo && (
            <span className="block mt-1 font-medium text-red-500 text-xs">
              {errors.photo.message}
            </span>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block mb-1 font-bold text-[#03373D] text-xs">
            Email Address
          </label>
          <div className="relative">
            <FaEnvelope className="top-1/2 left-3.5 absolute text-gray-400 text-sm -translate-y-1/2" />
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="bg-gray-50/60 focus:bg-white py-2.5 pr-4 pl-10 border border-gray-200 focus:border-[#03373D] rounded-xl focus:outline-none w-full text-[#03373D] text-sm transition-all"
              placeholder="name@example.com"
            />
          </div>
          {errors.email && (
            <span className="block mt-1 font-medium text-red-500 text-xs">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-bold text-[#03373D] text-xs">
            Password
          </label>
          <div className="relative">
            <FaLock className="top-1/2 left-3.5 absolute text-gray-400 text-sm -translate-y-1/2" />
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
              className="bg-gray-50/60 focus:bg-white py-2.5 pr-10 pl-10 border border-gray-200 focus:border-[#03373D] rounded-xl focus:outline-none w-full text-[#03373D] text-sm transition-all"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="top-1/2 right-3.5 absolute text-gray-400 hover:text-[#03373D] transition-colors -translate-y-1/2 cursor-pointer"
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
          className="flex justify-center items-center bg-[#C7EA52] hover:bg-[#b8dd42] disabled:opacity-50 shadow-sm hover:shadow-md mt-1 py-3 rounded-xl w-full font-bold text-[#03373D] text-sm active:scale-[0.99] transition-all cursor-pointer"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Register"
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center my-3">
          <div className="flex-grow border-gray-200 border-t"></div>
          <span className="px-3 font-medium text-gray-400 text-xs uppercase">
            Or
          </span>
          <div className="flex-grow border-gray-200 border-t"></div>
        </div>

        {/* Social Login */}
        <SocialLogin type="register" />

        {/* Login Redirect */}
        <p className="mt-4 text-gray-600 text-xs text-center">
          Already have an account?{" "}
          <Link
            state={location.state}
            to="/login"
            className="font-bold text-[#03373D] hover:underline"
          >
            Login
          </Link>
        </p>

      </form>
    </motion.div>
  );
};

export default Register;