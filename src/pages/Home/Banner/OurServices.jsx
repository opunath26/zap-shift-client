import React from 'react';
import serviceImg from '../../../assets/service.png';

const OurServices = () => {

    const services = [
        {
            title: "Express  & Standard Delivery",
            desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
        },
        {
            title: "Nationwide Delivery",
            desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
        },
        {
            title: "Fulfillment Solution",
            desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
        },
        {
            title: "Cash on Home Delivery",
            desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
        },
        {
            title: "Corporate Service / Contract In Logistics",
            desc: "Customized corporate services which includes warehouse and inventory management support.",
        },
        {
            title: "Parcel Return",
            desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
        },
    ];

    return (
        <section className="bg-secondary m-5 sm:m-10 lg:m-20 p-6 sm:p-10 lg:p-20 rounded-4xl">
            <div className="mx-auto px-2 sm:px-4 max-w-7xl">

                {/* Title */}
                <h2 className="mb-3 font-bold text-white text-2xl sm:text-3xl text-center">
                    Our Services
                </h2>
                <p className="mx-auto mb-12 max-w-2xl text-gray-300 text-sm sm:text-base text-center">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>

                {/* Cards Grid */}
                <div className="gap-6 sm:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white hover:bg-primary shadow-md p-6 rounded-xl hover:text-white text-center transition-all duration-300 cursor-pointer"
                        >
                            {/* Icon/Image */}
                            <div className="flex justify-center mb-4">
                                <img src={serviceImg} alt="icon" className="w-12 sm:w-14 h-12 sm:h-14" />
                            </div>

                            {/* Title */}
                            <h3 className="mb-2 font-semibold text-base sm:text-lg">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm sm:text-sm">
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
