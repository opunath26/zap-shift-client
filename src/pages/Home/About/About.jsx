import React from 'react';
import { motion } from 'framer-motion';
import { FaShippingFast, FaShieldAlt, FaUsers, FaGlobe } from 'react-icons/fa';

const About = () => {
  const stats = [
    { id: 1, name: 'Parcels Delivered', value: '1M+' },
    { id: 2, name: 'Active Riders', value: '5,000+' },
    { id: 3, name: 'Coverage Districts', value: '64' },
    { id: 4, name: 'Satisfied Clients', value: '99.8%' },
  ];

  const features = [
    {
      icon: <FaShippingFast className="text-primary text-4xl" />,
      title: 'Fastest Delivery',
      desc: 'Super-fast door-to-door parcel delivery with real-time tracking system.',
    },
    {
      icon: <FaShieldAlt className="text-primary text-4xl" />,
      title: '100% Secure',
      desc: 'Complete safety insurance for your high-value goods and documents.',
    },
    {
      icon: <FaUsers className="text-primary text-4xl" />,
      title: 'Dedicated Support',
      desc: '24/7 customer care team ready to assist with any shipment query.',
    },
    {
      icon: <FaGlobe className="text-primary text-4xl" />,
      title: 'Nationwide Network',
      desc: 'Strong logistics infrastructure spanning every corner of the country.',
    },
  ];

  // Container variants for staggered child animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-base-100 py-12 overflow-hidden">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center"
      >
        <h1 className="font-extrabold text-gray-900 text-4xl sm:text-5xl">
          About <span className="text-primary">Zap-Shift</span>
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-gray-600 text-xl">
          We are redefining modern logistics by bridging distances with speed, reliability, and smart tracking technology.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-primary/10 mt-16 py-12"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <dl className="gap-8 grid grid-cols-2 md:grid-cols-4 text-center">
            {stats.map((stat) => (
              <motion.div 
                key={stat.id} 
                whileHover={{ scale: 1.05 }}
                className="flex flex-col bg-base-100/60 shadow-sm backdrop-blur-sm p-4 rounded-xl"
              >
                <dt className="order-2 mt-2 font-medium text-gray-600 text-lg">{stat.name}</dt>
                <dd className="order-1 font-extrabold text-primary text-4xl">{stat.value}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="mx-auto mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="font-bold text-gray-900 text-3xl">Why Choose Zap-Shift?</h2>
          <p className="mt-2 text-gray-600">Built to power seamless e-commerce courier services.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="flex flex-col items-center bg-base-100 shadow-sm hover:shadow-xl p-6 border rounded-2xl text-center transition-all duration-300"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="bg-primary/10 mb-4 p-3 rounded-full"
              >
                {feature.icon}
              </motion.div>
              <h3 className="mb-2 font-semibold text-gray-800 text-xl">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;