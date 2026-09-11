import React from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaUserCog } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router';
import useAuth from '../hooks/useAuth'; 
import Logo from '../components/Logo/Logo';


const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 mx-auto max-w-7xl min-h-screen drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      
      {/* Main Content Area */}
      <div className="flex flex-col drawer-content">
        {/* Navbar */}
        <nav className="justify-between bg-base-300 px-4 border-base-200 border-b w-full navbar">
          <div className="flex items-center gap-2">
            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
              {/* Sidebar toggle icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block my-1.5 size-5"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
            </label>
            <span className="font-bold text-lg">Zap Shift Dashboard</span>
          </div>

          {/* User Profile Quick Info */}
          {user && (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline font-medium text-sm">{user?.displayName}</span>
              <div className="avatar">
                <div className="rounded-full ring ring-primary ring-offset-1 ring-offset-base-100 w-8">
                  <img src={user?.photoURL || 'https://i.ibb.co/mR4q38K/user.png'} alt="User Profile" />
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Dynamic Page Content */}
        <main className="flex-1 bg-base-100 p-6">
          <Outlet />
        </main>
      </div>

      {/* Sidebar Area with Collapse Feature */}
      <div className="z-20 is-drawer-close:overflow-visible drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 min-h-full">
          
          {/* Logo Section */}
          <div className="flex justify-center lg:justify-start items-center p-3 border-base-300 border-b w-full">
            <Link to="/" className="w-full overflow-hidden">
              <Logo />
            </Link>
          </div>

          {/* Sidebar content here */}
          <ul className="gap-1 mt-2 w-full menu grow">
            {/* Homepage Link */}
            <li>
              <Link to="/" className="is-drawer-close:tooltip-right is-drawer-close:tooltip" data-tip="Homepage">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block my-1.5 size-5"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* My Parcels Link */}
            <li>
              <NavLink className="is-drawer-close:tooltip-right is-drawer-close:tooltip" data-tip="My Parcels" to="/dashboard/my-parcels">
                <CiDeliveryTruck className="size-5" />
                <span className="is-drawer-close:hidden">My Parcels</span>
              </NavLink>
            </li>

            {/* Profile Settings Link */}
            <li>
              <NavLink className="is-drawer-close:tooltip-right is-drawer-close:tooltip" data-tip="Settings" to="/dashboard/profile">
                <FaUserCog className="size-5" />
                <span className="is-drawer-close:hidden">Profile Settings</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;