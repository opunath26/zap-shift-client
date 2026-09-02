import React from "react";
import { Link } from "react-router";
import Logo from "../../../components/Logo/Logo";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0B0B0B] mx-4 sm:mx-8 lg:mx-auto my-8 p-8 sm:p-12 lg:p-16 rounded-3xl max-w-7xl text-white">
      <div className="mx-auto max-w-6xl">
        {/* Top Section */}
        <div className="flex flex-col items-center mb-10 text-center">
          {/* Logo */}
          <div className="mb-4">
            <Logo />
          </div>

          {/* Description */}
          <p className="max-w-2xl text-gray-400 text-sm sm:text-base leading-relaxed">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero
            hassle. From personal packages to business shipments — we deliver on
            time, every time.
          </p>

          {/* Social Media Links */}
          <div className="flex items-center gap-4 mt-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="flex justify-center items-center bg-gray-800 hover:bg-primary rounded-full w-10 h-10 text-gray-300 hover:text-white transition-all duration-300"
            >
              <FaFacebookF className="text-base" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex justify-center items-center bg-gray-800 hover:bg-primary rounded-full w-10 h-10 text-gray-300 hover:text-white transition-all duration-300"
            >
              <FaLinkedinIn className="text-base" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="flex justify-center items-center bg-gray-800 hover:bg-primary rounded-full w-10 h-10 text-gray-300 hover:text-white transition-all duration-300"
            >
              <FaTwitter className="text-base" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="flex justify-center items-center bg-gray-800 hover:bg-primary rounded-full w-10 h-10 text-gray-300 hover:text-white transition-all duration-300"
            >
              <FaYoutube className="text-base" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-800" />

        {/* Middle Section - Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-6 sm:gap-8 font-medium text-gray-300 text-sm sm:text-base">
          <li>
            <Link to="/services" className="hover:text-primary transition-colors">
              Services
            </Link>
          </li>
          <li>
            <Link to="/coverage" className="hover:text-primary transition-colors">
              Coverage
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-primary transition-colors">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/pricing" className="hover:text-primary transition-colors">
              Pricing
            </Link>
          </li>
          <li>
            <Link to="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </li>
        </ul>

        {/* Bottom Section - Copyright & Terms */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-4 mt-10 pt-6 border-gray-800/60 border-t text-gray-500 text-xs sm:text-sm">
          <p>© {new Date().getFullYear()} Delivery Service. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;