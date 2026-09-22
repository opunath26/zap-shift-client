import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState('');
  
  // State for managing selected parcel and rider for assignment modal
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [selectedRiderId, setSelectedRiderId] = useState('');

  // 1. Fetch all parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ['allParcels'],
    queryFn: async () => {
      const res = await axiosSecure.get('/parcels');
      return res.data;
    },
  });

  // 2. Fetch all active riders/deliverymen for assignment
  const { data: riders = [] } = useQuery({
    queryKey: ['riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders');
      return res.data;
    },
  });

  // 3. Mutation for assigning rider
  const assignRiderMutation = useMutation({
    mutationFn: async ({ parcelId, riderData }) => {
      const res = await axiosSecure.patch(`/parcels/assign-rider/${parcelId}`, riderData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allParcels'] });
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Rider assigned successfully to the parcel.',
        timer: 2000,
        showConfirmButton: false,
      });
      document.getElementById('assign_rider_modal').close();
      setSelectedParcel(null);
      setSelectedRiderId('');
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.response?.data?.error || 'Failed to assign rider',
      });
    },
  });

  // Handle Assign Form Submit
  const handleAssignSubmit = (e) => {
    e.preventDefault();
    if (!selectedRiderId || !selectedParcel) return;

    const chosenRider = riders.find((r) => r.id === selectedRiderId || r._id === selectedRiderId);
    if (!chosenRider) return;

    const parcelId = selectedParcel.id || selectedParcel._id;
    const riderData = {
      riderId: chosenRider.id || chosenRider._id,
      riderName: chosenRider.name,
      riderEmail: chosenRider.email,
      riderPhone: chosenRider.phone,
    };

    assignRiderMutation.mutate({ parcelId, riderData });
  };

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
      case 'assigned':
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
            <option value="assigned">Assigned</option>
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
              <th>Assigned Rider</th>
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
                <td>
                  {parcel.assignedRiderName ? (
                    <div>
                      <p className="font-semibold text-xs">{parcel.assignedRiderName}</p>
                      <p className="text-[10px] text-gray-400">{parcel.assignedRiderPhone}</p>
                    </div>
                  ) : (
                    <span className="text-error text-xs italic">Not Assigned</span>
                  )}
                </td>
                <td className="text-center">
                  <button
                    onClick={() => {
                      setSelectedParcel(parcel);
                      setSelectedRiderId(parcel.assignedRiderId || '');
                      document.getElementById('assign_rider_modal').showModal();
                    }}
                    className="btn-outline btn btn-xs btn-primary"
                  >
                    {parcel.status === 'pending' ? 'Assign Rider' : 'Reassign / View'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DaisyUI Assign Rider Modal */}
      <dialog id="assign_rider_modal" className="modal">
        <div className="modal-box">
          <h3 className="mb-4 font-bold text-lg">Assign Delivery Rider 🚴</h3>
          {selectedParcel && (
            <form onSubmit={handleAssignSubmit} className="space-y-4">
              <div className="space-y-1 bg-base-200 p-3 rounded-lg text-sm">
                <p><span className="font-semibold">Parcel Type:</span> {selectedParcel.parcelType}</p>
                <p><span className="font-semibold">Receiver Address:</span> {selectedParcel.receiverAddress}</p>
              </div>

              <div>
                <label className="label">
                  <span className="font-medium label-text">Select Rider (District/Region based)</span>
                </label>
                <select
                  value={selectedRiderId}
                  onChange={(e) => setSelectedRiderId(e.target.value)}
                  required
                  className="w-full select-bordered select"
                >
                  <option value="" disabled>Choose a rider</option>
                  {riders.map((rider) => (
                    <option key={rider.id || rider._id} value={rider.id || rider._id}>
                      {rider.name} — {rider.district || 'N/A'} ({rider.phone || 'No Phone'})
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => document.getElementById('assign_rider_modal').close()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={assignRiderMutation.isPending}
                >
                  {assign_rider_mutation_loading_check(assignRiderMutation.isPending)}
                </button>
              </div>
            </form>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

// Helper to keep button text clean during pending state
const assign_rider_mutation_loading_check = (isPending) => {
  return isPending ? 'Assigning...' : 'Confirm Assignment';
};

export default AllParcels;