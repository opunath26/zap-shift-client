import React from 'react';
import { motion } from 'framer-motion';
import { FaStore, FaMotorcycle, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const JoinBanner = () => {
  return (
    <section className="mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-20 max-w-7xl">
      <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
        
        {/* Merchant Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group relative flex flex-col justify-between bg-secondary shadow-xl p-8 sm:p-10 rounded-3xl overflow-hidden text-white"
        >
          {/* Subtle Background Icon */}
          <FaStore className="-right-8 -bottom-8 absolute text-white/5 text-9xl group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 mb-6 px-4 py-1.5 rounded-full font-bold text-primary text-xs uppercase tracking-wider">
              <FaStore /> For Business Owners
            </div>

            <h3 className="mb-4 font-extrabold text-white text-2xl sm:text-4xl leading-tight">
              Become a <span className="text-primary">Merchant</span> Today
            </h3>

            <p className="mb-6 text-gray-300 text-sm sm:text-base leading-relaxed">
              Grow your e-commerce business with Bangladesh’s fastest logistics partner. Enjoy nationwide coverage, lowest COD charges, and next-day payout.
            </p>

            <ul className="space-y-2.5 mb-8 text-gray-300 text-sm">
              <li className="flex items-center gap-2.5">
                <FaCheckCircle className="flex-shrink-0 text-primary text-base" />
                <span>Zero registration & maintenance cost</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaCheckCircle className="flex-shrink-0 text-primary text-base" />
                <span>Dedicated merchant dashboard & API support</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaCheckCircle className="flex-shrink-0 text-primary text-base" />
                <span>Guaranteed 24-48 hours payment cycle</span>
              </li>
            </ul>
          </div>

          <div>
            <button className="inline-flex justify-center items-center gap-3 bg-primary hover:bg-white shadow-lg px-8 py-4 rounded-2xl w-full sm:w-auto font-bold text-secondary group-hover:scale-105 transition-all duration-300">
              <span>Register as Merchant</span>
              <FaArrowRight className="text-sm" />
            </button>
          </div>
        </motion.div>

        {/* Rider Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group relative flex flex-col justify-between bg-primary shadow-xl p-8 sm:p-10 border border-primary/40 rounded-3xl overflow-hidden text-secondary"
        >
          {/* Subtle Background Icon */}
          <FaMotorcycle className="-right-8 -bottom-8 absolute text-secondary/5 text-9xl group-hover:-rotate-6 group-hover:scale-110 transition-all duration-500 pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-2 bg-secondary/10 mb-6 px-4 py-1.5 rounded-full font-bold text-secondary text-xs uppercase tracking-wider">
              <FaMotorcycle /> Earn Money
            </div>

            <h3 className="mb-4 font-extrabold text-secondary text-2xl sm:text-4xl leading-tight">
              Earn With Us as a <span className="decoration-secondary/30 underline">Rider</span>
            </h3>

            <p className="mb-6 text-secondary/80 text-sm sm:text-base leading-relaxed">
              Turn your bike or bicycle into an income source. Join our delivery fleet, enjoy flexible working hours, and earn industry-leading payouts.
            </p>

            <ul className="space-y-2.5 mb-8 font-medium text-secondary/90 text-sm">
              <li className="flex items-center gap-2.5">
                <FaCheckCircle className="flex-shrink-0 text-secondary text-base" />
                <span>Flexible work timing — full-time or part-time</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaCheckCircle className="flex-shrink-0 text-secondary text-base" />
                <span>Weekly guaranteed payments & delivery bonuses</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaCheckCircle className="flex-shrink-0 text-secondary text-base" />
                <span>Accidental health insurance coverage</span>
              </li>
            </ul>
          </div>

          <div>
            <button className="inline-flex justify-center items-center gap-3 bg-secondary hover:bg-secondary/90 shadow-lg px-8 py-4 rounded-2xl w-full sm:w-auto font-bold text-white group-hover:scale-105 transition-all duration-300">
              <span>Join as Rider</span>
              <FaArrowRight className="text-primary text-sm" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default JoinBanner;