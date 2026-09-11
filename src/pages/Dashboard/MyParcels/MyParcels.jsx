import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ['myParcels', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-10">
        <span className="text-primary loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Status badge color generator
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'badge-success';
      case 'cancelled':
        return 'badge-error';
      case 'in-transit':
        return 'badge-warning';
      default:
        return 'badge-info';
    }
  };

  return (
    <div className="bg-base-100 shadow-xl my-6 p-6 border border-base-200 rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-bold text-base-content text-2xl">
            My Parcels 📦
          </h2>
          <p className="text-gray-500 text-sm">
            Track and manage all your parcel bookings
          </p>
        </div>
        <div className="p-3 font-semibold badge badge-primary badge-lg">
          Total: {parcels.length}
        </div>
      </div>

      {parcels.length === 0 ? (
        <div className="py-10 text-gray-500 text-center">
          <p className="font-medium text-lg">No parcels found!</p>
          <p className="text-sm">You haven't booked any parcels yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* Table Head */}
            <thead>
              <tr className="bg-base-200 text-base-content">
                <th>#</th>
                <th>Parcel Type</th>
                <th>Receiver Name</th>
                <th>Receiver Phone</th>
                <th>Cost ($)</th>
                <th>Booking Date</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel.id || parcel._id}>
                  <th>{index + 1}</th>
                  <td className="font-medium">
                    {parcel.parcelType || 'N/A'}
                  </td>
                  <td>{parcel.receiverName || 'N/A'}</td>
                  <td>{parcel.receiverPhone || parcel.receiverContactNo || 'N/A'}</td>
                  <td className="font-bold text-primary">
                    ${parcel.cost || parcel.price || 0}
                  </td>
                  <td>
                    {parcel.bookingDate
                      ? new Date(parcel.bookingDate).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td>
                    <span
                      className={`badge ${getStatusBadge(
                        parcel.status
                      )} text-white capitalize`}
                    >
                      {parcel.status || 'pending'}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn-outline btn btn-xs btn-error"
                      disabled={parcel.status !== 'pending'}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyParcels;