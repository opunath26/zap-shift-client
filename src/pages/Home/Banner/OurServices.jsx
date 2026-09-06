import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaShippingFast, 
  FaGlobeAsia, 
  FaBoxes, 
  FaMoneyBillWave, 
  FaBuilding, 
  FaUndo 
} from 'react-icons/fa';

const services = [
  {
    title: "Express & Standard Delivery",
    desc: "We deliver parcels within 24–72 hours across major divisions. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <FaShippingFast className="text-2xl sm:text-3xl" />,
  },
  {
    title: "Nationwide Delivery",
    desc: "We deliver parcels nationwide with reliable door-to-door coverage in all 64 districts within 48–72 hours.",
    icon: <FaGlobeAsia className="text-2xl sm:text-3xl" />,
  },
  {
    title: "Fulfillment Solution",
    desc: "End-to-end inventory management support, online order processing, custom packaging, and dedicated after-sales service.",
    icon: <FaBoxes className="text-2xl sm:text-3xl" />,
  },
  {
    title: "Cash on Delivery (COD)",
    desc: "100% secure Cash on Delivery option anywhere in Bangladesh with quick payment disbursement for merchants.",
    icon: <FaMoneyBillWave className="text-2xl sm:text-3xl" />,
  },
  {
    title: "Corporate & B2B Logistics",
    desc: "Customized corporate contract solutions including dedicated bulk shipment, warehouse, and logistics support.",
    icon: <FaBuilding className="text-2xl sm:text-3xl" />,
  },
  {
    title: "Hassle-Free Returns",
    desc: "Efficient reverse logistics allowing end-customers to return or exchange products effortlessly with e-commerce stores.",
    icon: <FaUndo className="text-2xl sm:text-3xl" />,
  },
];

const OurServices = () => {
  return (
    <section className="relative bg-secondary mx-4 sm:mx-8 lg:mx-auto my-12 sm:my-20 px-4 sm:px-8 lg:px-12 py-12 sm:py-16 rounded-3xl sm:rounded-[2.5rem] max-w-7xl overflow-hidden">
      
      {/* Background Subtle Glow Elements */}
      <div className="top-0 right-0 absolute bg-primary/10 blur-3xl rounded-full w-72 h-72 pointer-events-none"></div>
      <div className="bottom-0 left-0 absolute bg-primary/5 blur-3xl rounded-full w-72 h-72 pointer-events-none"></div>

      <div className="z-10 relative mx-auto max-w-6xl">
        
        {/* Section Title Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="inline-block bg-white/10 mb-3 px-4 py-1.5 rounded-full font-bold text-primary text-xs uppercase tracking-widest">
            What We Offer
          </span>
          <h2 className="font-extrabold text-white text-3xl sm:text-4xl">
            Services Built for Speed & Reliability
          </h2>
          <p className="mt-3 text-gray-300 text-sm sm:text-base leading-relaxed">
            From personal shipments to large-scale merchant supply chains, Zap-Shift provides seamlessly tracked logistics.
          </p>
        </motion.div>

        {/* Services Cards Grid */}
        <div className="gap-6 sm:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group flex flex-col items-center bg-white/5 hover:bg-primary shadow-lg p-6 sm:p-8 border border-white/10 rounded-3xl text-center transition-all hover:-translate-y-2 duration-300 cursor-pointer"
            >
              {/* Dynamic Icon Container */}
              <div className="flex justify-center items-center bg-primary/20 group-hover:bg-secondary shadow-inner mb-6 rounded-2xl w-14 h-14 text-primary group-hover:text-primary transition-all duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="mb-3 font-bold text-white group-hover:text-secondary text-lg sm:text-xl transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 group-hover:text-secondary/90 text-sm leading-relaxed transition-colors">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurServices;