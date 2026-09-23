import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  // 2. Fetch all active riders
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
        title: 'Assigned Successfully!',
        text: 'Rider has been assigned to this parcel.',
        timer: 2000,
        showConfirmButton: false,
        customClass: { popup: 'rounded-2xl' }
      });
      document.getElementById('assign_rider_modal').close();
      setSelectedParcel(null);
      setSelectedRiderId('');
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Assignment Failed',
        text: error.response?.data?.error || 'Something went wrong',
        customClass: { popup: 'rounded-2xl' }
      });
    },
  });

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

  // Filter logic for status & search query
  const filteredParcels = parcels.filter((p) => {
    const matchesStatus = statusFilter
      ? p.status?.toLowerCase() === statusFilter.toLowerCase()
      : true;
    const matchesSearch =
      p.senderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.receiverName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.parcelType?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Stats calculation
  const stats = {
    total: parcels.length,
    pending: parcels.filter(p => p.status?.toLowerCase() === 'pending').length,
    inTransit: parcels.filter(p => ['in-transit', 'assigned'].includes(p.status?.toLowerCase())).length,
    delivered: parcels.filter(p => p.status?.toLowerCase() === 'delivered').length,
  };

  // Status Badge Helper
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'badge-success text-white bg-emerald-500 border-none';
      case 'cancelled':
        return 'badge-error text-white bg-rose-500 border-none';
      case 'in-transit':
      case 'assigned':
        return 'badge-warning text-white bg-amber-500 border-none';
      default:
        return 'badge-info text-white bg-sky-500 border-none';
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center my-10 min-h-[60vh] gap-3">
        <span className="text-primary loading loading-spin loading-lg"></span>
        <p className="text-sm font-medium text-base-content/60">Fetching all parcel details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-2 md:p-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-base-content">Parcel Management 📦</h2>
          <p className="text-sm text-base-content/60 mt-1">
            Monitor status, assign riders, and manage all shipment orders in real time.
          </p>
        </div>
      </div>

      {/* Metrics Summary Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat bg-base-100 rounded-2xl border border-base-200 shadow-sm p-4">
          <div className="stat-title text-xs font-semibold uppercase tracking-wider">Total Parcels</div>
          <div className="stat-value text-2xl md:text-3xl font-black text-primary">{stats.total}</div>
        </div>
        <div className="stat bg-base-100 rounded-2xl border border-base-200 shadow-sm p-4">
          <div className="stat-title text-xs font-semibold uppercase tracking-wider text-sky-600">Pending</div>
          <div className="stat-value text-2xl md:text-3xl font-black text-sky-500">{stats.pending}</div>
        </div>
        <div className="stat bg-base-100 rounded-2xl border border-base-200 shadow-sm p-4">
          <div className="stat-title text-xs font-semibold uppercase tracking-wider text-amber-600">On The Way</div>
          <div className="stat-value text-2xl md:text-3xl font-black text-amber-500">{stats.inTransit}</div>
        </div>
        <div className="stat bg-base-100 rounded-2xl border border-base-200 shadow-sm p-4">
          <div className="stat-title text-xs font-semibold uppercase tracking-wider text-emerald-600">Delivered</div>
          <div className="stat-value text-2xl md:text-3xl font-black text-emerald-500">{stats.delivered}</div>
        </div>
      </div>

      {/* Table Container Card */}
      <div className="bg-base-100 rounded-2xl border border-base-200 shadow-xl overflow-hidden">
        {/* Controls Header */}
        <div className="p-5 border-b border-base-200 bg-base-100/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search sender, receiver or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered input-sm w-full rounded-xl focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select select-bordered select-sm rounded-xl text-sm focus:outline-none"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="in-transit">In-Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <span className="badge badge-neutral px-3 py-3 rounded-lg text-xs font-medium">
              Showing {filteredParcels.length}
            </span>
          </div>
        </div>

        {/* Parcels Table */}
        <div className="overflow-x-auto">
          <table className="table w-full align-middle">
            <thead>
              <tr className="bg-base-200/60 text-xs uppercase tracking-wider text-base-content/70">
                <th className="py-4">#</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Parcel Details</th>
                <th>Cost</th>
                <th>Booking Date</th>
                <th>Status</th>
                <th>Assigned Rider</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200 text-sm">
              {filteredParcels.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-12 text-base-content/50 font-medium">
                    No parcels found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredParcels.map((parcel, index) => (
                  <tr key={parcel.id || parcel._id} className="hover:bg-base-200/30 transition-colors">
                    <td className="font-semibold text-xs text-base-content/40">{index + 1}</td>
                    <td>
                      <div className="font-bold text-base-content">{parcel.senderName || 'N/A'}</div>
                      <div className="text-xs text-base-content/50">{parcel.senderEmail}</div>
                    </td>
                    <td>
                      <div className="font-medium text-base-content">{parcel.receiverName || 'N/A'}</div>
                      <div className="text-xs text-base-content/50">{parcel.receiverPhone || 'N/A'}</div>
                    </td>
                    <td>
                      <span className="badge badge-ghost badge-sm font-medium rounded-md">
                        {parcel.parcelType || 'Document'}
                      </span>
                    </td>
                    <td className="font-bold text-primary">${parcel.cost || 0}</td>
                    <td className="text-xs text-base-content/70">
                      {parcel.bookingDate
                        ? new Date(parcel.bookingDate).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : 'N/A'}
                    </td>
                    <td>
                      <span className={`badge badge-sm font-semibold px-2.5 py-2 capitalize ${getStatusBadge(parcel.status)}`}>
                        {parcel.status || 'pending'}
                      </span>
                    </td>
                    <td>
                      {parcel.assignedRiderName ? (
                        <div className="flex items-center gap-2">
                          <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-7 text-xs">
                              <span>{parcel.assignedRiderName.charAt(0)}</span>
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-xs text-base-content">{parcel.assignedRiderName}</p>
                            <p className="text-[10px] text-base-content/50">{parcel.assignedRiderPhone}</p>
                          </div>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-rose-500 font-medium bg-rose-50 dark:bg-rose-950/30 px-2 py-1 rounded-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span> Unassigned
                        </span>
                      )}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => {
                          setSelectedParcel(parcel);
                          setSelectedRiderId(parcel.assignedRiderId || '');
                          document.getElementById('assign_rider_modal').showModal();
                        }}
                        className={`btn btn-xs rounded-lg font-medium transition-all ${
                          parcel.status === 'pending'
                            ? 'btn-primary shadow-sm shadow-primary/30'
                            : 'btn-outline border-base-300 hover:bg-base-200 text-base-content'
                        }`}
                      >
                        {parcel.status === 'pending' ? 'Assign Rider' : 'Reassign'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Assign Rider Modal */}
      <dialog id="assign_rider_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
        <div className="modal-box rounded-3xl p-6 border border-base-200 shadow-2xl">
          <div className="flex items-center justify-between border-b border-base-200 pb-4 mb-4">
            <h3 className="font-bold text-xl text-base-content flex items-center gap-2">
              <span>🚴</span> Assign Delivery Rider
            </h3>
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost text-base-content/50"
              onClick={() => document.getElementById('assign_rider_modal').close()}
            >
              ✕
            </button>
          </div>

          {selectedParcel && (
            <form onSubmit={handleAssignSubmit} className="space-y-5">
              {/* Selected Parcel Quick Info */}
              <div className="bg-base-200/60 border border-base-200 p-4 rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-base-content/60">Parcel Category:</span>
                  <span className="font-bold text-base-content">{selectedParcel.parcelType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/60">Receiver Address:</span>
                  <span className="font-semibold text-base-content max-w-[200px] text-right truncate">
                    {selectedParcel.receiverAddress || 'N/A'}
                  </span>
                </div>
              </div>

              {/* Rider Select Input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70">
                  Select Rider
                </label>
                <select
                  value={selectedRiderId}
                  onChange={(e) => setSelectedRiderId(e.target.value)}
                  required
                  className="select select-bordered w-full rounded-xl text-sm focus:outline-none focus:border-primary"
                >
                  <option value="" disabled>Choose an active deliveryman</option>
                  {riders.map((rider) => (
                    <option key={rider.id || rider._id} value={rider.id || rider._id}>
                      {rider.name} — {rider.district || 'All Districts'} ({rider.phone || 'No Phone'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="modal-action pt-2 border-t border-base-200">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm rounded-xl text-xs font-semibold"
                  onClick={() => document.getElementById('assign_rider_modal').close()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm rounded-xl px-5 text-xs font-semibold shadow-md shadow-primary/20"
                  disabled={assignRiderMutation.isPending}
                >
                  {assignRiderMutation.isPending ? 'Assigning...' : 'Confirm Assignment'}
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

export default AllParcels;