import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, LogOut, User as UserIcon, LayoutDashboard, UserCheck } from "lucide-react";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [role] = useUserRole();

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
    <>
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

          {/* Right Buttons & Profile Dropdown */}
          <div className="flex items-center space-x-3">
            {role !== "deliveryman" && (
              <Link
                to="/rider"
                className="hidden sm:inline-flex bg-secondary hover:bg-secondary/90 border-none font-semibold text-white transition-all btn btn-sm"
              >
                Be a Rider
              </Link>
            )}

            {/* User Logged In State vs Logged Out State */}
            {user ? (
              <div className="dropdown dropdown-end">
                {/* Profile Avatar Trigger Button */}
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded-full transition-all cursor-pointer"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="rounded-full ring-2 ring-primary/40 w-9 h-9 object-cover"
                    />
                  ) : (
                    <div className="flex justify-center items-center bg-primary/20 rounded-full w-9 h-9 text-primary">
                      <UserIcon size={20} />
                    </div>
                  )}
                </div>

                {/* Dropdown Options */}
                <ul
                  tabIndex={0}
                  className="right-0 z-[1] bg-white shadow-xl mt-3 p-2 border border-gray-100 rounded-2xl w-56 dropdown-content menu menu-sm"
                >
                  <li className="px-3 py-2 border-b">
                    <p className="font-bold text-gray-800 text-sm">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-gray-500 text-xs truncate">{user.email}</p>
                  </li>

                  <li className="mt-2">
                    <Link to="/dashboard/profile" className="flex items-center gap-2 py-2 text-gray-700">
                      <UserCheck size={16} />
                      <span>Profile</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/dashboard" className="flex items-center gap-2 py-2 text-gray-700">
                      <LayoutDashboard size={16} />
                      <span>Dashboard</span>
                    </Link>
                  </li>

                  <li className="mt-1 border-t">
                    <button
                      onClick={handleLogOut}
                      className="flex items-center gap-2 py-2 text-red-600 hover:text-red-700"
                    >
                      <LogOut size={16} />
                      <span>Log Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary hover:bg-primary/90 border-none font-semibold text-black transition-all btn btn-sm"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Moved outside <header> for better z-index overlay) */}
      <div className="z-50 drawer">
        <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
          <div className="flex flex-col bg-white p-6 w-72 min-h-full">
            <div className="mb-6">
              <Logo />
            </div>

            <ul className="flex-1 space-y-2">
              {links}
            </ul>

            <div className="space-y-3 pt-6 border-t">
              {role !== "deliveryman" && (
                <Link
                  to="/rider"
                  className="flex justify-center items-center bg-secondary hover:bg-secondary/90 rounded-lg w-full h-10 font-semibold text-white text-sm"
                >
                  Be a Rider
                </Link>
              )}

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
    </>
  );
};

export default Navbar;