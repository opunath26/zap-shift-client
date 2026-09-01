import React from 'react';
import { 
  FaShippingFast, 
  FaGlobeAsia, 
  FaBoxes, 
  FaMoneyBillWave, 
  FaBuilding, 
  FaUndo 
} from 'react-icons/fa';

const OurServices = () => {
  const services = [
    {
      title: "Express & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
      icon: <FaShippingFast className="text-3xl sm:text-4xl" />,
    },
    {
      title: "Nationwide Delivery",
      desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
      icon: <FaGlobeAsia className="text-3xl sm:text-4xl" />,
    },
    {
      title: "Fulfillment Solution",
      desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
      icon: <FaBoxes className="text-3xl sm:text-4xl" />,
    },
    {
      title: "Cash on Home Delivery",
      desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      icon: <FaMoneyBillWave className="text-3xl sm:text-4xl" />,
    },
    {
      title: "Corporate Service / Contract Logistics",
      desc: "Customized corporate services which includes warehouse and inventory management support.",
      icon: <FaBuilding className="text-3xl sm:text-4xl" />,
    },
    {
      title: "Parcel Return",
      desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
      icon: <FaUndo className="text-3xl sm:text-4xl" />,
    },
  ];

  return (
    <section className="bg-secondary my-8 sm:my-16 py-12 sm:py-16 px-4 sm:px-8 lg:px-12 rounded-3xl sm:rounded-[2.5rem] mx-4 sm:mx-8 lg:mx-auto max-w-7xl">
      <div className="mx-auto max-w-6xl">
        {/* Title */}
        <div className="mb-10 text-center">
          <h2 className="font-bold text-white text-3xl sm:text-4xl">
            Our Services
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-300 text-sm sm:text-base leading-relaxed">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
            From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="gap-6 sm:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group flex flex-col items-center bg-white hover:bg-primary shadow-lg p-6 sm:p-8 rounded-2xl text-center hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* Dynamic Icon */}
              <div className="flex justify-center items-center bg-primary/10 group-hover:bg-white mb-5 rounded-2xl w-16 h-16 text-primary group-hover:text-primary transition-all duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="mb-3 font-semibold group-hover:text-white text-gray-800 text-lg sm:text-xl transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="group-hover:text-white/90 text-gray-600 text-sm leading-relaxed transition-colors">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;