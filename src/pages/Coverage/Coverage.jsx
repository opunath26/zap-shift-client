import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';
import { motion } from 'framer-motion';

const Coverage = () => {
    const position = [23.6850, 90.3563];
    const serviceCenters = useLoaderData() || [];
    const mapRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const location = e.target.location.value.trim();
        if (!location) return;

        const district = serviceCenters.find(c => 
            c.district?.toLowerCase().includes(location.toLowerCase()) ||
            c.covered_area?.some(area => area.toLowerCase().includes(location.toLowerCase()))
        );

        if (district && mapRef.current) {
            const coord = [district.latitude, district.longitude];
            mapRef.current.flyTo(coord, 12, {
                duration: 1.5
            });
        }
    };

    return (
        <div className="bg-base-100 py-10 min-h-screen">
            {/* Header Section */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center"
            >
                <h1 className="font-extrabold text-gray-900 text-4xl sm:text-5xl">
                    We Are Available In <span className="text-primary">64 Districts</span>
                </h1>
                <p className="mx-auto mt-3 max-w-2xl text-gray-600 text-lg">
                    Search your district or area to fly directly to your nearest service center on the map.
                </p>

                {/* Search Bar */}
                <div className="mx-auto mt-8 max-w-xl">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <label className="flex items-center gap-2 shadow-sm focus-within:border-primary rounded-full input input-bordered grow">
                            <svg className="opacity-60 w-5 h-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input 
                                type="search" 
                                name="location" 
                                className="text-gray-800 grow" 
                                placeholder="Search by District or Area (e.g. Dhaka, Mirpur)..." 
                            />
                        </label>
                        <button type="submit" className="px-6 rounded-full text-white btn btn-primary">
                            Search
                        </button>
                    </form>
                </div>
            </motion.div>

            {/* Map Container */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mx-auto mt-10 px-4 sm:px-6 lg:px-8 max-w-7xl"
            >
                <div className="z-0 relative shadow-lg border border-base-300 rounded-3xl h-[650px] overflow-hidden">
                    <MapContainer
                        center={position}
                        zoom={7}
                        scrollWheelZoom={true}
                        className="w-full h-full"
                        ref={mapRef}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {serviceCenters.map((center, index) => (
                            <Marker
                                key={center.id || index}
                                position={[center.latitude, center.longitude]}
                            >
                                <Popup>
                                    <div className="p-1">
                                        <h3 className="mb-1 font-bold text-primary text-base">{center.district} Hub</h3>
                                        <p className="mb-2 text-gray-600 text-xs">
                                            <strong>Covered Areas:</strong>
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {center.covered_area?.map((area, idx) => (
                                                <span key={idx} className="bg-primary/10 px-2 py-0.5 rounded-md font-medium text-[10px] text-primary">
                                                    {area}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </motion.div>
        </div>
    );
};

export default Coverage;