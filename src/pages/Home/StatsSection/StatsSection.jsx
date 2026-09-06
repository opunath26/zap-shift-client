import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FaMapMarkedAlt, FaBoxes, FaHandshake, FaCheckCircle } from 'react-icons/fa';

const statsData = [
  {
    id: 1,
    icon: <FaMapMarkedAlt className="text-primary text-3xl" />,
    number: 64,
    suffix: '+',
    title: 'Districts Covered',
    description: 'Seamless network across Bangladesh',
  },
  {
    id: 2,
    icon: <FaBoxes className="text-primary text-3xl" />,
    number: 1000000,
    suffix: '+',
    title: 'Successful Deliveries',
    description: 'Safe & door-to-door deliveries',
    isFormatted: true, // For 1M+ display logic
  },
  {
    id: 3,
    icon: <FaHandshake className="text-primary text-3xl" />,
    number: 500,
    suffix: '+',
    title: 'Merchant Partners',
    description: 'Trusted by top e-commerce brands',
  },
  {
    id: 4,
    icon: <FaCheckCircle className="text-primary text-3xl" />,
    number: 99.8,
    decimals: 1,
    suffix: '%',
    title: 'On-Time Delivery',
    description: 'Speed & accuracy guaranteed',
  },
];

const StatsSection = () => {
  return (
    <div className="relative bg-secondary py-16 overflow-hidden text-white">
      {/* Background Decorative Glow */}
      <div className="-top-24 -left-24 absolute bg-primary/10 blur-3xl rounded-full w-96 h-96 pointer-events-none"></div>
      <div className="-right-24 -bottom-24 absolute bg-primary/10 blur-3xl rounded-full w-96 h-96 pointer-events-none"></div>

      <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="inline-block bg-white/10 mb-3 px-4 py-1.5 rounded-full font-bold text-primary text-xs uppercase tracking-widest">
            Our Milestones
          </span>
          <h2 className="font-extrabold text-white text-3xl sm:text-4xl">
            Numbers That Speak For Our Reliability
          </h2>
          <p className="mt-2 text-gray-300 text-sm sm:text-base">
            Empowering businesses and individuals across the country with unmatched speed and security.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col justify-between bg-white/5 shadow-lg p-6 border border-white/10 hover:border-primary/50 rounded-3xl transition-all hover:-translate-y-1 duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="bg-white/10 p-3 rounded-2xl">
                  {stat.icon}
                </div>
                <span className="bg-primary/10 px-2.5 py-1 rounded-lg font-semibold text-primary text-xs">
                  Live Tracked
                </span>
              </div>

              <div>
                <div className="flex items-center font-extrabold text-white text-3xl sm:text-4xl tracking-tight">
                  {stat.isFormatted ? (
                    <>
                      <CountUp end={1} duration={2.5} enableScrollSpy scrollSpyOnce />
                      <span>M</span>
                    </>
                  ) : (
                    <CountUp
                      end={stat.number}
                      decimals={stat.decimals || 0}
                      duration={2.5}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  )}
                  <span className="ml-0.5 text-primary">{stat.suffix}</span>
                </div>

                <h3 className="mt-2 font-bold text-gray-100 text-lg">
                  {stat.title}
                </h3>
                <p className="mt-1 text-gray-400 text-xs">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default StatsSection;