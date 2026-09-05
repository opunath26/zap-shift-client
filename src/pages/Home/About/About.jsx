import React from 'react';
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

  return (
    <div className="bg-base-100 py-12">
      {/* Hero Section */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
        <h1 className="font-extrabold text-gray-900 text-4xl sm:text-5xl">
          About <span className="text-primary">Zap-Shift</span>
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-gray-600 text-xl">
          We are redefining modern logistics by bridging distances with speed, reliability, and smart tracking technology.
        </p>
      </div>

      {/* Stats Section */}
      <div className="bg-primary/10 mt-16 py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <dl className="gap-8 grid grid-cols-2 md:grid-cols-4 text-center">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col p-4">
                <dt className="order-2 mt-2 font-medium text-gray-600 text-lg">{stat.name}</dt>
                <dd className="order-1 font-extrabold text-primary text-4xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="font-bold text-gray-900 text-3xl">Why Choose Zap-Shift?</h2>
          <p className="mt-2 text-gray-600">Built to power seamless e-commerce courier services.</p>
        </div>
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center bg-base-100 shadow-sm hover:shadow-md p-6 border rounded-2xl text-center transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-2 font-semibold text-gray-800 text-xl">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;