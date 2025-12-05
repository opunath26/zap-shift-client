import React from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { Link, NavLink, Outlet } from 'react-router';

const DashboardLayout = () => {
  return (
    <div className="space-y-8 mx-auto max-w-5xl drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="bg-base-300 w-full navbar">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block my-1.5 size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
          </label>
          <div className="px-4">Zap Shift Dashboard</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="is-drawer-close:overflow-visible drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 min-h-full">
          {/* Sidebar content here */}
          <ul className="w-full menu grow">
            {/* List item */}
            <li>
              <Link to="/" className="is-drawer-close:tooltip-right is-drawer-close:tooltip" data-tip="Homepage">
                {/* Home icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block my-1.5 size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* Our dashboard links */}
            <li>
              <NavLink className="is-drawer-close:tooltip-right is-drawer-close:tooltip" data-tip="MyParcel" to="/dashboard/my-parcels">
              <CiDeliveryTruck />
                <span className="is-drawer-close:hidden">My Parcels</span>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              <button className="is-drawer-close:tooltip-right is-drawer-close:tooltip" data-tip="Settings">
                {/* Settings icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block my-1.5 size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;