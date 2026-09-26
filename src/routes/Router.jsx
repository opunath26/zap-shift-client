import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import RiderRoute from "./RiderRoute";
import AdminRoute from "./AdminRoute";
import Rider from "../pages/Rider/Rider";
import SendParcel from "../pages/sendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import About from "../pages/Home/About/About";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AllParcels from "../pages/Dashboard/AllParcels/AllParcels";
import Profile from "../pages/Dashboard/Profile/Profile";
import AdminRiderApplications from "../pages/Dashboard/RiderApplications/AdminRiderApplications";
import MyDeliveries from "../pages/Dashboard/MyDeliveries/MyDeliveries";
import RiderDashboard from "../pages/Dashboard/RiderDashboard/RiderDashboard";
import AdminCashHandovers from "../pages/Dashboard/AdminCashHandovers/AdminCashHandovers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <Rider />
          </PrivateRoute>
        ),
      },
      {
        path: "send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "coverage",
        element: <Coverage />,
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        element: <MyParcels />,
      },
      {
        path: "profile",
        element: <Profile />,
      },

      // Rider Exclusive Routes
      {
        path: "rider-dashboard",
        element: (
          <RiderRoute>
            <RiderDashboard />
          </RiderRoute>
        ),
      },
      {
        path: "my-deliveries",
        element: (
          <RiderRoute>
            <MyDeliveries />
          </RiderRoute>
        ),
      },

      // Admin Exclusive Routes
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-parcels",
        element: (
          <AdminRoute>
            <AllParcels />
          </AdminRoute>
        ),
      },
      {
        path: "rider-applications",
        element: (
          <AdminRoute>
            <AdminRiderApplications />
          </AdminRoute>
        ),
      },
      {
        path: "admin-cash-handovers",
        element: (
          <AdminRoute>
            <AdminCashHandovers />
          </AdminRoute>
        ),
      },
    ],
  },
]);