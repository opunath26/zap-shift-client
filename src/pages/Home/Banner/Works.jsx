import React from "react";
import { 
  FaBoxOpen, 
  FaTruckLoading, 
  FaRoute, 
  FaCheckCircle 
} from "react-icons/fa";

export default function Work() {
  const steps = [
    {
      step: "01",
      title: "Book Parcel",
      desc: "Enter pickup and delivery details along with parcel weight to create an order.",
      icon: <FaBoxOpen className="text-3xl sm:text-4xl" />,
    },
    {
      step: "02",
      title: "Doorstep Pickup",
      desc: "Our agent collects the package directly from your address with utmost care.",
      icon: <FaTruckLoading className="text-3xl sm:text-4xl" />,
    },
    {
      step: "03",
      title: "Live Tracking",
      desc: "Monitor your parcel position real-time via tracking ID from hub to route.",
      icon: <FaRoute className="text-3xl sm:text-4xl" />,
    },
    {
      step: "04",
      title: "Safe Delivery & Cash",
      desc: "Successful delivery at customer doorstep with fast cash disbursement to merchant.",
      icon: <FaCheckCircle className="text-3xl sm:text-4xl" />,
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto px-4 max-w-7xl">
        
        {/* Section Title */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-block bg-primary/20 mb-3 px-4 py-1.5 rounded-full font-bold text-secondary text-xs uppercase tracking-widest">
            Simple Process
          </span>
          <h2 className="font-extrabold text-secondary text-3xl sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-2 text-gray-500 text-sm sm:text-base">
            Simple and seamless 4-step process to handle all your parcel & courier logistics
          </p>
        </div>

        {/* Steps Grid */}
        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-center bg-gray-50 hover:bg-white shadow-sm hover:shadow-xl p-6 border border-gray-100 hover:border-primary/40 rounded-3xl text-center transition-all hover:-translate-y-2 duration-300"
            >
              {/* Step Number Badge */}
              <span className="top-4 right-4 absolute bg-gray-200/60 group-hover:bg-primary px-2.5 py-1 rounded-full font-black text-gray-500 group-hover:text-secondary text-xs transition-colors">
                {item.step}
              </span>

              {/* Icon Container */}
              <div className="flex justify-center items-center bg-primary/20 group-hover:bg-primary shadow-sm mb-5 border border-primary/30 rounded-2xl w-16 h-16 text-secondary transition-all duration-300">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="mb-2 font-bold text-secondary text-xl">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}