import React from 'react';
import { useForm } from 'react-hook-[#form]';
import Swal from 'sweetalert2';
import sendParcel from '../../assets/banner/agent-pending.png';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const Rider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || '',
      email: user?.email || '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(`/users/role/${user?.email}`, {
        role: 'deliveryman',
        riderDetails: data,
      });

      if (res.data) {
        Swal.fire({
          title: 'Success!',
          text: 'Your rider application has been submitted successfully!',
          icon: 'success',
          confirmButtonColor: '#C6F16A',
          confirmButtonTextColor: '#000',
        });
        reset();
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error?.response?.data?.error || 'Failed to submit application',
        icon: 'error',
      });
    }
  };

  return (
    <div className="flex justify-center bg-[#F5F5F5] px-4 py-10 w-full min-h-screen">
      <div className="bg-white shadow p-8 md:p-10 rounded-2xl w-full max-w-6xl">
        {/* Heading */}
        <h1 className="font-bold text-[#1A1A1A] text-3xl">Be a Rider</h1>
        <p className="mt-2 max-w-xl text-gray-600">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>

        <hr className="my-8 border-gray-200" />

        <h2 className="mb-5 font-semibold text-gray-800 text-xl">Tell us about yourself</h2>

        {/* Grid Layout */}
        <div className="gap-10 grid grid-cols-1 md:grid-cols-2">
          {/* Form Left */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Your Name</label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                defaultValue={user?.displayName}
                readOnly
                className="bg-gray-100 px-3 py-2 border rounded-lg outline-none w-full cursor-not-allowed"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Your Email</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                defaultValue={user?.email}
                readOnly
                className="bg-gray-100 px-3 py-2 border rounded-lg outline-none w-full cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Phone Number</label>
              <input
                type="text"
                placeholder="017xxxxxxxx"
                {...register('phone', { required: 'Phone number is required' })}
                className="px-3 py-2 border focus:border-primary rounded-lg outline-none w-full"
              />
              {errors.phone && (
                <span className="text-red-500 text-xs">{errors.phone.message}</span>
              )}
            </div>

            {/* NID */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">NID No</label>
              <input
                type="text"
                placeholder="NID Number"
                {...register('nid', { required: 'NID number is required' })}
                className="px-3 py-2 border focus:border-primary rounded-lg outline-none w-full"
              />
              {errors.nid && (
                <span className="text-red-500 text-xs">{errors.nid.message}</span>
              )}
            </div>

            {/* License */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">
                Driving License Number
              </label>
              <input
                type="text"
                placeholder="Driving License Number"
                {...register('license', { required: 'Driving License is required' })}
                className="px-3 py-2 border focus:border-primary rounded-lg outline-none w-full"
              />
              {errors.license && (
                <span className="text-red-500 text-xs">{errors.license.message}</span>
              )}
            </div>

            {/* Region */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Your Region</label>
              <select
                {...register('region', { required: 'Region is required' })}
                className="px-3 py-2 border focus:border-primary rounded-lg outline-none w-full"
              >
                <option value="">Select your Region</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Sylhet">Sylhet</option>
              </select>
              {errors.region && (
                <span className="text-red-500 text-xs">{errors.region.message}</span>
              )}
            </div>

            {/* District */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Your District</label>
              <select
                {...register('district', { required: 'District is required' })}
                className="px-3 py-2 border focus:border-primary rounded-lg outline-none w-full"
              >
                <option value="">Select your District</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Gazipur">Gazipur</option>
                <option value="Cumilla">Cumilla</option>
              </select>
              {errors.district && (
                <span className="text-red-500 text-xs">{errors.district.message}</span>
              )}
            </div>

            {/* Bike Model */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">
                Bike Brand Model and Year
              </label>
              <input
                type="text"
                placeholder="e.g. Yamaha FZ-S 2022"
                {...register('bikeModel', { required: 'Bike details are required' })}
                className="px-3 py-2 border focus:border-primary rounded-lg outline-none w-full"
              />
              {errors.bikeModel && (
                <span className="text-red-500 text-xs">{errors.bikeModel.message}</span>
              )}
            </div>

            {/* Bike Reg Number */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">
                Bike Registration Number
              </label>
              <input
                type="text"
                placeholder="e.g. DHAKA METRO-LA-12-3456"
                {...register('bikeRegNo', { required: 'Bike Registration No is required' })}
                className="px-3 py-2 border focus:border-primary rounded-lg outline-none w-full"
              />
              {errors.bikeRegNo && (
                <span className="text-red-500 text-xs">{errors.bikeRegNo.message}</span>
              )}
            </div>

            {/* About */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">
                Tell Us About Yourself
              </label>
              <textarea
                rows="3"
                placeholder="Share your driving experience..."
                {...register('about')}
                className="px-3 py-2 border focus:border-primary rounded-lg outline-none w-full"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-[#C6F16A] hover:bg-[#b3e35c] shadow-sm py-2.5 rounded-lg w-full font-semibold text-black transition"
            >
              Submit Application
            </button>
          </form>

          {/* Right Image Section */}
          <div className="flex justify-center items-start lg:pt-10">
            <img
              src={sendParcel}
              alt="Rider Illustration"
              className="top-10 sticky w-80 md:w-[380px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rider;