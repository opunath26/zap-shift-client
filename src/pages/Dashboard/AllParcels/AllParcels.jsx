import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState('');

  // 1. Fetch all parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ['allParcels'],
    queryFn: async () => {
      const res = await axiosSecure.get('/parcels');
      return res.data;
    },
  });

  // Filter parcels based on selected status
  const filteredParcels = statusFilter
    ? parcels.filter((p) => p.status?.toLowerCase() === statusFilter.toLowerCase())
    : parcels;

  // Status Badge Helper
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'badge-success';
      case 'cancelled':
        return 'badge-error';
      case 'in-transit':
        return 'badge-warning';
      default:
        return 'badge-info'; // pending
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-10 min-h-[50vh]">
        <span className="text-primary loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="bg-base-100 shadow-xl p-6 border border-base-200 rounded-2xl">
      {/* Header & Filter Section */}
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 mb-6">
        <div>
          <h2 className="font-bold text-base-content text-2xl">All Parcels 📦</h2>
          <p className="text-gray-500 text-sm">Manage and track all booked parcels</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Filter Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full max-w-xs select-bordered select-sm select"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-transit">In-Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="p-3 font-semibold whitespace-nowrap badge badge-primary badge-lg">
            Total: {filteredParcels.length}
          </div>
        </div>
      </div>

      {/* Parcels Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200 text-base-content">
              <th>#</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Type</th>
              <th>Cost</th>
              <th>Booking Date</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredParcels.map((parcel, index) => (
              <tr key={parcel.id || parcel._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="font-bold">{parcel.senderName || 'N/A'}</div>
                  <div className="text-gray-500 text-xs">{parcel.senderEmail}</div>
                </td>
                <td>
                  <div className="font-medium">{parcel.receiverName || 'N/A'}</div>
                  <div className="text-gray-500 text-xs">{parcel.receiverPhone || 'N/A'}</div>
                </td>
                <td className="font-medium">{parcel.parcelType || 'Document'}</td>
                <td className="font-bold text-primary">${parcel.cost || 0}</td>
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
                  <button className="btn-outline btn btn-xs btn-primary">
                    Manage / Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllParcels;