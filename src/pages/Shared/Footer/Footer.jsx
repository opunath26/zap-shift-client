import React from "react";
import { Link } from "react-router";
import Logo from "../../../components/Logo/Logo";

const Footer = () => {
  return (
    <footer
      className="mx-5 mt-5 p-10 rounded-xl text-white text-center"
      style={{ backgroundColor: "#0B0B0B" }}
    >
      {/* Logo */}
      <h1 className="flex justify-center mb-4 font-bold text-3xl">
        <Logo></Logo>
      </h1>

      {/* Description */}
      <p className="mx-auto max-w-2xl text-gray-300 text-sm md:text-base leading-relaxed">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      {/* Footer Links */}
      <ul className="flex flex-wrap justify-center gap-6 mt-6 text-gray-400 text-sm md:text-base">
        <li><Link to="/services" className="hover:text-primary">Services</Link></li>
        <li><Link to="/coverage" className="hover:text-primary">Coverage</Link></li>
        <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
        <li><Link to="/pricing" className="hover:text-primary">Pricing</Link></li>
        <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
        <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
      </ul>
    </footer>
  );
};

export default Footer;
