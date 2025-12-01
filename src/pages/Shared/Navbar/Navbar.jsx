import React from "react";
import Logo from "../../../components/Logo/Logo";
import { Menu } from "lucide-react"; // icon
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {

  const {user, logOut} = useAuth();

  const handleLogOut = () => {
    logOut()
      .then()
      .catch(error => {
        console.log(error);
      })};

    const links = 
    <>
        <li><NavLink to="">Services</NavLink></li>
        <li><NavLink to="">About Us</NavLink></li>
        <li><NavLink to="/send-parcel">Send Parcel</NavLink></li>
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
        {/* <button to="/signin" className="btn-outline btn btn-sm">
          Sign In
        </button> */}
        {
          user ?
          <Link onClick={handleLogOut} to="/login"
          className="bg-primary text-black btn btn-sm"
        > Log Out </Link> 

        : <Link to="/login"
          className="bg-primary text-black btn btn-sm"
        >
          Log In </Link>
        }

        <Link to="/rider"
          className="bg-primary text-black btn btn-sm"
        >
          Be a rider </Link>

      </div>

      {/* Mobile Drawer Menu */}
      <input id="mobile-menu" type="checkbox" className="drawer-toggle" />
      <div className="z-50 drawer-side">
        <label htmlFor="mobile-menu" className="drawer-overlay"></label>
        <ul className="space-y-4 bg-white p-4 w-64 min-h-full text-base-content menu">
          {links}

          <div className="space-y-2 mt-4 pt-4 border-t">
            
            {
              user ?
              <Link onClick={handleLogOut}
              to="/login"
              className="w-full btn btn-sm"
              style={{ backgroundColor: "#CAEB66" }}
            >
              Log Out
            </Link> : 
            <Link 
              to="/home"
              className="w-full btn btn-sm"
              style={{ backgroundColor: "#CAEB66" }}
            >
              Log In
            </Link>
            }
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
