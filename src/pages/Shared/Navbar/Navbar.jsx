import React from "react";
import Logo from "../../../components/Logo/Logo";
import { Menu } from "lucide-react"; // icon
import { NavLink } from "react-router";

const Navbar = () => {

    const links = 
    <>
        <li><NavLink to="">Services</NavLink></li>
        <li><NavLink to="">About Us</NavLink></li>
        <li><NavLink to="/coverage">Coverage</NavLink></li>
    </>

  return (
    <div className="bg-white shadow-md px-4 md:px-8 navbar">

      {/* Left (Logo + Mobile Menu Button) */}
      <div className="lg:hidden flex-none">
        <label htmlFor="mobile-menu" className="lg:hidden btn btn-ghost">
          <Menu size={22} />
        </label>
      </div>

      <div className="flex-1">
        <Logo></Logo>
      </div>

      {/* Center (Desktop Menu) */}
      <div className="hidden lg:flex flex-1 justify-center">
        <ul className="space-x-6 menu menu-horizontal">
          {links}
        </ul>
      </div>

      {/* Right Buttons */}
      <div className="hidden md:flex flex-none space-x-2">
        <button to="/signin" className="btn-outline btn btn-sm">
          Sign In
        </button>
        <button
          to="/signup"
          className="bg-primary text-black btn btn-sm"
        >
          Sign Up
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <input id="mobile-menu" type="checkbox" className="drawer-toggle" />
      <div className="z-50 drawer-side">
        <label htmlFor="mobile-menu" className="drawer-overlay"></label>
        <ul className="space-y-4 bg-white p-4 w-64 min-h-full text-base-content menu">
          {links}

          <div className="space-y-2 mt-4 pt-4 border-t">
            <button to="/signin" className="btn-outline w-full btn btn-sm">
              Sign In
            </button>
            <button
              to="/signup"
              className="w-full btn btn-sm"
              style={{ backgroundColor: "#CAEB66" }}
            >
              Sign Up
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
