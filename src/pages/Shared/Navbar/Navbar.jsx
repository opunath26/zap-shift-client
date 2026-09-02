import React from "react";
import { Link, NavLink } from "react-router";
import { Menu, LogOut, User as UserIcon } from "lucide-react";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg font-medium transition-colors ${
      isActive
        ? "text-primary font-semibold bg-primary/10"
        : "text-gray-700 hover:text-primary hover:bg-gray-100"
    }`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/services" className={navLinkClass}>
          Services
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={navLinkClass}>
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/send-parcel" className={navLinkClass}>
          Send Parcel
        </NavLink>
      </li>
      <li>
        <NavLink to="/coverage" className={navLinkClass}>
          Coverage
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink to="/dashboard/my-parcels" className={navLinkClass}>
            My Parcels
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <header className="top-0 z-50 sticky bg-white/95 shadow-sm backdrop-blur-md border-b">
      <div className="mx-auto px-4 md:px-8 max-w-7xl navbar">
        {/* Left (Mobile Menu Button + Logo) */}
        <div className="flex flex-1 lg:flex-none items-center gap-2">
          {/* Mobile Drawer Button */}
          <div className="lg:hidden">
            <label htmlFor="mobile-drawer" className="p-2 btn btn-ghost btn-circle">
              <Menu size={24} />
            </label>
          </div>
          <Logo />
        </div>

        {/* Center (Desktop Menu) */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center space-x-2 font-medium">
            {links}
          </ul>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="flex items-center gap-3">
              {/* User Avatar / Name */}
              <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-sm">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="rounded-full w-6 h-6 object-cover"
                  />
                ) : (
                  <UserIcon size={16} className="text-gray-600" />
                )}
                <span className="font-semibold text-gray-800 text-xs sm:text-sm">
                  {user.displayName?.split(" ")[0] || "User"}
                </span>
              </div>

              <button
                onClick={handleLogOut}
                className="hover:bg-red-50 border border-transparent hover:border-red-200 text-red-600 hover:text-red-700 transition-all btn btn-sm"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-primary hover:bg-primary/90 border-none font-semibold text-black transition-all btn btn-sm"
            >
              Log In
            </Link>
          )}

          <Link
            to="/rider"
            className="hidden sm:inline-flex bg-secondary hover:bg-secondary/90 border-none font-semibold text-white transition-all btn btn-sm"
          >
            Be a Rider
          </Link>
        </div>

        {/* Mobile Drawer Menu */}
        <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
        <div className="z-50 drawer-side">
          <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
          <div className="flex flex-col bg-white p-6 w-72 min-h-full">
            <div className="mb-6">
              <Logo />
            </div>

            <ul className="flex-1 space-y-2">
              {links}
            </ul>

            <div className="space-y-3 pt-6 border-t">
              <Link
                to="/rider"
                className="flex justify-center items-center bg-secondary hover:bg-secondary/90 rounded-lg w-full h-10 font-semibold text-white text-sm"
              >
                Be a Rider
              </Link>

              {user ? (
                <button
                  onClick={handleLogOut}
                  className="flex justify-center items-center hover:bg-red-50 border border-red-200 rounded-lg w-full h-10 font-semibold text-red-600 text-sm transition-colors"
                >
                  Log Out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex justify-center items-center bg-primary hover:bg-primary/90 rounded-lg w-full h-10 font-semibold text-black text-sm"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;