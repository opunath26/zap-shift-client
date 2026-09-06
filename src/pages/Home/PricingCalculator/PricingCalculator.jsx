import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalculator, FaWeightHanging, FaMapMarkerAlt, FaTruck, FaRegCheckCircle } from 'react-icons/fa';

const PricingCalculator = () => {
  const [deliveryType, setDeliveryType] = useState('inside'); // 'inside' | 'outside'
  const [weight, setWeight] = useState(1); // in kg
  const [isCod, setIsCod] = useState(true);
  const [amount, setAmount] = useState(1000); // estimated product value for COD calculation

  // Pricing Logic
  const calculateCharge = () => {
    let baseCharge = deliveryType === 'inside' ? 60 : 120; // Base charge up to 1kg
    let extraWeightCharge = 0;

    if (weight > 1) {
      const extraKg = Math.ceil(weight - 1);
      extraWeightCharge = extraKg * (deliveryType === 'inside' ? 15 : 25);
    }

    const codCharge = isCod ? Math.round((Number(amount) || 0) * 0.01) : 0; // 1% COD fee
    const total = baseCharge + extraWeightCharge + codCharge;

    return {
      baseCharge,
      extraWeightCharge,
      codCharge,
      total,
    };
  };

  const pricing = calculateCharge();

  return (
    <div className="bg-base-200/50 py-16">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 mb-3 px-4 py-1.5 rounded-full font-bold text-secondary text-xs uppercase tracking-wider">
            <FaCalculator /> Instant Estimation
          </div>
          <h2 className="font-extrabold text-secondary text-3xl sm:text-4xl">
            Calculate Delivery Charge
          </h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Know your exact shipping cost before placing an order with our transparent pricing formula.
          </p>
        </motion.div>

        {/* Calculator Grid */}
        <div className="items-start gap-8 grid grid-cols-1 lg:grid-cols-12">
          
          {/* Controls Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 lg:col-span-7 bg-base-100 shadow-xl p-6 sm:p-8 border border-gray-100 rounded-3xl"
          >
            {/* Delivery Location Selector */}
            <div>
              <label className="flex items-center gap-2 font-bold text-secondary text-sm label">
                <FaMapMarkerAlt className="text-primary" /> Delivery Destination
              </label>
              <div className="gap-3 grid grid-cols-2 mt-1">
                <button
                  type="button"
                  onClick={() => setDeliveryType('inside')}
                  className={`btn rounded-2xl flex flex-col items-center justify-center py-6 h-auto border-2 transition-all ${
                    deliveryType === 'inside'
                      ? 'bg-secondary text-white border-secondary shadow-md'
                      : 'bg-base-100 border-gray-200 text-gray-600 hover:border-secondary/40'
                  }`}
                >
                  <span className="font-bold text-base">Inside City</span>
                  <span className="opacity-80 font-normal text-[11px]">Same/Next Day Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('outside')}
                  className={`btn rounded-2xl flex flex-col items-center justify-center py-6 h-auto border-2 transition-all ${
                    deliveryType === 'outside'
                      ? 'bg-secondary text-white border-secondary shadow-md'
                      : 'bg-base-100 border-gray-200 text-gray-600 hover:border-secondary/40'
                  }`}
                >
                  <span className="font-bold text-base">Outside City</span>
                  <span className="opacity-80 font-normal text-[11px]">2-3 Days Delivery</span>
                </button>
              </div>
            </div>

            {/* Weight Range Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="flex items-center gap-2 font-bold text-secondary text-sm label">
                  <FaWeightHanging className="text-primary" /> Parcel Weight
                </label>
                <span className="bg-primary/20 px-3 py-1 rounded-full font-extrabold text-secondary text-xs">
                  {weight} KG
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="range range-primary range-sm"
              />
              <div className="flex justify-between mt-1 px-1 text-gray-400 text-xs">
                <span>0.5 KG</span>
                <span>5 KG</span>
                <span>10 KG</span>
              </div>
            </div>

            {/* COD Option Toggle */}
            <div className="pt-2 border-gray-100 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-secondary text-sm">Cash on Delivery (COD)</h4>
                  <p className="text-gray-500 text-xs">1% COD fee applies on total collection amount</p>
                </div>
                <input
                  type="checkbox"
                  checked={isCod}
                  onChange={(e) => setIsCod(e.target.checked)}
                  className="toggle toggle-primary"
                />
              </div>

              {isCod && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4"
                >
                  <label className="font-semibold text-gray-600 text-xs label">Product Price / Collection Amount (BDT)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 1500"
                    className="focus:border-secondary rounded-xl w-full text-sm input input-bordered"
                  />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Breakdown / Summary Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between space-y-6 lg:col-span-5 bg-secondary shadow-2xl p-6 sm:p-8 rounded-3xl text-white"
          >
            <div>
              <div className="flex justify-between items-center pb-4 border-white/10 border-b">
                <h3 className="flex items-center gap-2 font-bold text-lg">
                  <FaTruck className="text-primary" /> Cost Summary
                </h3>
                <span className="bg-primary px-3 border-none font-bold text-secondary text-xs uppercase badge">
                  Estimated
                </span>
              </div>

              {/* Price Breakdown List */}
              <div className="space-y-3 py-6 border-white/10 border-b text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Base Fare (up to 1 kg):</span>
                  <span className="font-bold text-white">৳ {pricing.baseCharge}</span>
                </div>
                {pricing.extraWeightCharge > 0 && (
                  <div className="flex justify-between text-gray-300">
                    <span>Extra Weight Charge:</span>
                    <span className="font-bold text-white">৳ {pricing.extraWeightCharge}</span>
                  </div>
                )}
                {isCod && (
                  <div className="flex justify-between text-gray-300">
                    <span>COD Fee (1%):</span>
                    <span className="font-bold text-white">৳ {pricing.codCharge}</span>
                  </div>
                )}
              </div>

              {/* Total Amount */}
              <div className="flex justify-between items-baseline pt-4">
                <div>
                  <span className="block text-gray-400 text-xs uppercase tracking-wider">Total Shipping Charge</span>
                  <p className="mt-0.5 text-gray-300 text-xs">*Vat included</p>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-primary text-3xl sm:text-4xl">
                    ৳ {pricing.total}
                  </span>
                </div>
              </div>
            </div>

            {/* Features list inside card */}
            <div className="space-y-2 pt-4 border-white/10 border-t text-gray-300 text-xs">
              <div className="flex items-center gap-2">
                <FaRegCheckCircle className="text-primary" /> Doorstep pickup and drop service included
              </div>
              <div className="flex items-center gap-2">
                <FaRegCheckCircle className="text-primary" /> Free real-time live SMS & app tracking
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;