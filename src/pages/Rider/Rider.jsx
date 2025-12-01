import React from "react";
import sendParcel from '../../assets/banner/agent-pending.png';

const Rider = () => {
  return (
    <div className="flex justify-center bg-[#F5F5F5] px-4 py-10 w-full min-h-screen">
      <div className="bg-white shadow p-10 rounded-2xl w-full max-w-6xl">

        {/* Heading */}
        <h1 className="font-bold text-[#1A1A1A] text-3xl">Be a Rider</h1>
        <p className="mt-2 max-w-xl text-gray-600">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>

        <hr className="my-8" />

        <h2 className="mb-5 font-semibold text-xl">Tell us about yourself</h2>

        {/* Grid Layout */}
        <div className="gap-10 grid grid-cols-1 md:grid-cols-2">

          {/* Form Left */}
          <form className="space-y-4">

            {/* Name */}
            <div>
              <label className="font-medium text-sm">Your Name</label>
              <input
                type="text"
                className="px-3 py-2 border rounded-lg w-full"
                placeholder="Your Name"
              />
            </div>

            {/* License */}
            <div>
              <label className="font-medium text-sm">Driving License Number</label>
              <input
                type="text"
                className="px-3 py-2 border rounded-lg w-full"
                placeholder="Driving License Number"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-medium text-sm">Your Email</label>
              <input
                type="email"
                className="px-3 py-2 border rounded-lg w-full"
                placeholder="Your Email"
              />
            </div>

            {/* Region */}
            <div>
              <label className="font-medium text-sm">Your Region</label>
              <select className="px-3 py-2 border rounded-lg w-full">
                <option>Select your Region</option>
              </select>
            </div>

            {/* District */}
            <div>
              <label className="font-medium text-sm">Your District</label>
              <select className="px-3 py-2 border rounded-lg w-full">
                <option>Select your District</option>
              </select>
            </div>

            {/* NID */}
            <div>
              <label className="font-medium text-sm">NID No</label>
              <input
                type="text"
                className="px-3 py-2 border rounded-lg w-full"
                placeholder="NID"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="font-medium text-sm">Phone Number</label>
              <input
                type="text"
                className="px-3 py-2 border rounded-lg w-full"
                placeholder="Phone Number"
              />
            </div>

            {/* Bike Model */}
            <div>
              <label className="font-medium text-sm">Bike Brand Model and Year</label>
              <input
                type="text"
                className="px-3 py-2 border rounded-lg w-full"
                placeholder="Bike Brand Model and Year"
              />
            </div>

            {/* Bike Reg Number */}
            <div>
              <label className="font-medium text-sm">Bike Registration Number</label>
              <input
                type="text"
                className="px-3 py-2 border rounded-lg w-full"
                placeholder="Bike Registration Number"
              />
            </div>

            {/* About */}
            <div>
              <label className="font-medium text-sm">Tell Us About Yourself</label>
              <textarea
                className="px-3 py-2 border rounded-lg w-full"
                placeholder="Tell Us About Yourself"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-[#C6F16A] hover:bg-[#b3e35c] py-2 rounded-lg w-full font-semibold transition"
            >
              Submit
            </button>
          </form>

          {/* Right Image Section */}
          <div className="flex justify-center items-start">
            
            <img
              src={sendParcel}
              alt="Rider Illustration"
              className="w-80 md:w-[380px]"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Rider;
