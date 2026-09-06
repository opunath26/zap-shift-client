import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaRocket, 
  FaShieldAlt, 
  FaPercentage, 
  FaHeadset, 
  FaMapMarkedAlt, 
  FaWallet 
} from 'react-icons/fa';

const features = [
  {
    id: 1,
    title: 'Lightning Fast Delivery',
    desc: 'Same-day delivery within Dhaka city and 24–48 hours nationwide guarantee.',
    icon: <FaRocket className="text-2xl sm:text-3xl" />,
    badge: 'Express',
  },
  {
    id: 2,
    title: 'Safe & Secured Handling',
    desc: '100% damage protection with real-time parcel safety monitoring and care.',
    icon: <FaShieldAlt className="text-2xl sm:text-3xl" />,
    badge: 'Protected',
  },
  {
    id: 3,
    title: 'Lowest COD Charge',
    desc: 'Enjoy maximum profit margin with only 1% Cash on Delivery charge nationwide.',
    icon: <FaPercentage className="text-2xl sm:text-3xl" />,
    badge: '1% Only',
  },
  {
    id: 4,
    title: '24/7 Dedicated Support',
    desc: 'Our customer success team is available round the clock to resolve your issues.',
    icon: <FaHeadset className="text-2xl sm:text-3xl" />,
    badge: 'Always On',
  },
  {
    id: 5,
    title: '64 Districts Coverage',
    desc: 'Doorstep pickup and drop services available in every sub-district of Bangladesh.',
    icon: <FaMapMarkedAlt className="text-2xl sm:text-3xl" />,
    badge: 'Nationwide',
  },
  {
    id: 6,
    title: 'Instant Cash Payout',
    desc: 'Quick and automated payment disbursement straight to your bank or mobile wallet.',
    icon: <FaWallet className="text-2xl sm:text-3xl" />,
    badge: 'Fast Payout',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative bg-base-100 py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="inline-block bg-primary/20 mb-3 px-4 py-1.5 rounded-full font-bold text-secondary text-xs uppercase tracking-widest">
            Our Advantages
          </span>
          <h2 className="font-extrabold text-secondary text-3xl sm:text-4xl">
            Why Choose <span className="bg-secondary px-3 py-1 rounded-xl text-primary">Zap-Shift</span>?
          </h2>
          <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
            We empower businesses and individuals with fast, transparent, and technology-driven logistics solutions.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative flex flex-col justify-between bg-base-100 shadow-sm hover:shadow-xl p-8 border border-gray-100 hover:border-primary/40 rounded-3xl transition-all hover:-translate-y-2 duration-300"
            >
              {/* Top Row: Icon & Feature Badge */}
              <div className="flex justify-between items-start mb-6">
                <div className="bg-primary/20 group-hover:bg-primary shadow-sm p-4 rounded-2xl text-secondary group-hover:text-secondary transition-all duration-300">
                  {feature.icon}
                </div>
                <span className="bg-gray-100 group-hover:bg-secondary px-3 py-1 rounded-full font-extrabold text-[11px] text-secondary group-hover:text-primary transition-colors">
                  {feature.badge}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="mb-2 font-bold text-secondary group-hover:text-secondary/90 text-xl">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              {/* Bottom Decorative Line */}
              <div className="bg-gray-100 group-hover:bg-primary mt-6 rounded-full w-full h-1 transition-colors duration-300"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;