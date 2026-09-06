import React, { useState } from 'react';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

const faqData = [
  {
    id: 1,
    question: "How fast is Zap-Shift's parcel delivery?",
    answer: "We offer same-day delivery within major metro areas and guaranteed 24 to 48-hour doorstep delivery for nationwide shipments, depending on the recipient location."
  },
  {
    id: 2,
    question: "How do I track my shipment in real-time?",
    answer: "Once your order is placed, you will receive a unique tracking ID and a live link via SMS/Email. You can also track it directly from the 'Track Order' page on our website."
  },
  {
    id: 3,
    question: "What are your Cash on Delivery (COD) payment terms?",
    answer: "We collect Cash on Delivery on your behalf without any hidden charges. Funds are automatically transferred directly to your merchant bank account or mobile wallet within 24 hours of successful delivery."
  },
  {
    id: 4,
    question: "Do you provide specialized corporate logistics services?",
    answer: "Yes, we offer customized corporate logistics including bulk parcel movements, scheduled pick-ups, dedicated relationship managers, and custom API integration for seamless automated ordering."
  },
  {
    id: 5,
    question: "What items are prohibited from shipping through Zap-Shift?",
    answer: "Fragile items without protective packaging, hazardous chemical substances, illegal goods, perishable foods without prior authorization, and unregistered cash or high-value jewelry cannot be dispatched."
  }
];

const FAQ = () => {
  const [openId, setOpenId] = useState(1); // First item open by default

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-gray-50/50 py-12 sm:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Header Section */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-block bg-primary/20 mb-3 px-4 py-1.5 rounded-full font-bold text-secondary text-xs uppercase tracking-widest">
            Got Questions?
          </span>
          <h2 className="mb-4 font-extrabold text-secondary text-3xl sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about our courier services, parcel tracking, merchant terms, and delivery support.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white shadow-xs hover:shadow-md border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="flex justify-between items-center gap-4 p-5 sm:p-6 focus:outline-none w-full text-left select-none"
                >
                  <div className="flex items-center gap-3.5">
                    <FaQuestionCircle className={`text-lg sm:text-xl shrink-0 transition-colors duration-300 ${isOpen ? 'text-secondary' : 'text-gray-400'}`} />
                    <span className="font-bold text-secondary text-base sm:text-lg">
                      {item.question}
                    </span>
                  </div>
                  <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-primary text-secondary rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                    <FaChevronDown className="text-xs sm:text-sm" />
                  </div>
                </button>

                {/* Collapsible Answer Box */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pt-1 pb-6 border-gray-100 border-t border-dashed text-gray-600 text-sm sm:text-base leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;