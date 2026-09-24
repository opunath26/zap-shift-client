import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const MyDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth(); 

  const { data: deliveries = [], isLoading } = useQuery({
    queryKey: ['myDeliveries', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/rider/${user?.email}`);
      return res.data;
    },
  });


  const updateStatusMutation = useMutation({
    mutationFn: async ({ parcelId, status }) => {
      const res = await axiosSecure.patch(`/parcels/status/${parcelId}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myDeliveries', user?.email] });
      Swal.fire({
        icon: 'success',
        title: 'Status Updated!',
        text: 'Parcel status has been updated successfully.',
        timer: 2000,
        showConfirmButton: false,
        customClass: { popup: 'rounded-2xl' }
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.error || 'Could not update status',
        customClass: { popup: 'rounded-2xl' }
      });
    },
  });

  const handleStatusChange = (parcelId, currentStatus, newStatus) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to mark this parcel as "${newStatus}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
      customClass: { popup: 'rounded-2xl' }
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ parcelId, status: newStatus });
      }
    });
  };

  // Status Badge Helper
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'badge-success text-white bg-emerald-500 border-none';
      case 'cancelled':
        return 'badge-error text-white bg-rose-500 border-none';
      case 'in-transit':
        return 'badge-warning text-white bg-amber-500 border-none';
      default:
        return 'badge-info text-white bg-sky-500 border-none';
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center gap-3 my-10 min-h-[60vh]">
        <span className="text-primary loading loading-spin loading-lg"></span>
        <p className="font-medium text-sm text-base-content/60">Fetching your assigned deliveries...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-2 md:p-6">
      {/* Header Section */}
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-4">
        <div>
          <h2 className="font-extrabold text-base-content text-3xl tracking-tight">My Deliveries 🚚</h2>
          <p className="mt-1 text-sm text-base-content/60">
            View assigned parcels, update statuses, and manage pickup/delivery schedules.
          </p>
        </div>
        <div className="p-3 rounded-xl font-semibold text-sm badge badge-primary">
          Total Assigned: {deliveries.length}
        </div>
      </div>

      {/* Deliveries Table Card */}
      <div className="bg-base-100 shadow-xl border border-base-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full align-middle">
            <thead>
              <tr className="bg-base-200/60 text-xs text-base-content/70 uppercase tracking-wider">
                <th className="py-4">#</th>
                <th>Parcel Details</th>
                <th>Receiver Info</th>
                <th>Delivery Address</th>
                <th>Cost</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200 text-sm">
              {deliveries.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 font-medium text-base-content/50 text-center">
                    No delivery tasks assigned to you yet.
                  </td>
                </tr>
              ) : (
                deliveries.map((parcel, index) => (
                  <tr key={parcel._id || parcel.id} className="hover:bg-base-200/30 transition-colors">
                    <td className="font-semibold text-xs text-base-content/40">{index + 1}</td>
                    <td>
                      <div className="font-bold text-base-content">{parcel.parcelType || 'Document'}</div>
                      <div className="text-xs text-base-content/50">Sender: {parcel.senderName}</div>
                    </td>
                    <td>
                      <div className="font-medium text-base-content">{parcel.receiverName || 'N/A'}</div>
                      <div className="text-xs text-base-content/50">{parcel.receiverPhone || 'N/A'}</div>
                    </td>
                    <td>
                      <p className="max-w-[200px] font-medium text-xs text-base-content/80 truncate">
                        {parcel.receiverAddress || 'N/A'}
                      </p>
                    </td>
                    <td className="font-bold text-primary">${parcel.cost || 0}</td>
                    <td>
                      <span className={`badge badge-sm font-semibold px-2.5 py-2 capitalize ${getStatusBadge(parcel.status)}`}>
                        {parcel.status || 'assigned'}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="flex justify-center items-center gap-2">
                        {parcel.status?.toLowerCase() === 'assigned' && (
                          <button
                            onClick={() => handleStatusChange(parcel._id || parcel.id, parcel.status, 'in-transit')}
                            className="rounded-lg text-white btn btn-xs btn-warning"
                          >
                            Start Pickup
                          </button>
                        )}
                        {parcel.status?.toLowerCase() === 'in-transit' && (
                          <button
                            onClick={() => handleStatusChange(parcel._id || parcel.id, parcel.status, 'delivered')}
                            className="rounded-lg text-white btn btn-xs btn-success"
                          >
                            Mark Delivered
                          </button>
                        )}
                        {parcel.status?.toLowerCase() === 'delivered' && (
                          <span className="font-semibold text-emerald-600 text-xs">Completed ✅</span>
                        )}
                        {parcel.status?.toLowerCase() === 'cancelled' && (
                          <span className="font-semibold text-rose-500 text-xs">Cancelled ❌</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyDeliveries;