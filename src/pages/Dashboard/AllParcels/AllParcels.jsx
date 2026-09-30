import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { 
  Package, 
  Clock, 
  Truck, 
  CheckCircle2, 
  Search, 
  Filter, 
  UserPlus, 
  UserCheck, 
  X, 
  Calendar, 
  DollarSign, 
  MapPin 
} from 'lucide-react';
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
      riderName: chosenRider.name || chosenRider.displayName || 'N/A',
      riderEmail: chosenRider.email || '',
      riderPhone: chosenRider.phone || chosenRider.phoneNumber || 'N/A',
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
        return 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20';
      case 'cancelled':
        return 'bg-rose-500/10 text-rose-600 border border-rose-500/20';
      case 'in-transit':
      case 'assigned':
        return 'bg-amber-500/10 text-amber-600 border border-amber-500/20';
      default:
        return 'bg-sky-500/10 text-sky-600 border border-sky-500/20';
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center gap-3 my-10 min-h-[60vh]">
        <span className="text-primary loading loading-spin loading-lg"></span>
        <p className="font-medium text-sm text-base-content/60">Fetching all parcel details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mx-auto p-4 md:p-8 max-w-7xl">
      {/* Top Header */}
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="flex items-center gap-3 font-black text-base-content text-2xl md:text-3xl tracking-tight">
            Parcel Management
            <span className="bg-primary/10 p-2 rounded-xl text-primary text-xl">📦</span>
          </h2>
          <p className="mt-1 text-xs md:text-sm text-base-content/60">
            Monitor status, assign riders, and manage all shipment orders in real time.
          </p>
        </div>
      </div>

      {/* Metrics Summary Grid */}
      <div className="gap-4 grid grid-cols-2 lg:grid-cols-4">
        {/* Total Parcels */}
        <div className="flex justify-between items-center bg-base-100 shadow-sm hover:shadow-md p-5 border border-base-200 rounded-2xl transition-all duration-200">
          <div>
            <p className="font-semibold text-xs text-base-content/60 uppercase tracking-wider">Total Parcels</p>
            <h3 className="mt-1 font-black text-base-content text-2xl md:text-3xl">{stats.total}</h3>
          </div>
          <div className="bg-primary/10 p-3 rounded-2xl text-primary">
            <Package size={24} />
          </div>
        </div>

        {/* Pending */}
        <div className="flex justify-between items-center bg-base-100 shadow-sm hover:shadow-md p-5 border border-base-200 rounded-2xl transition-all duration-200">
          <div>
            <p className="font-semibold text-sky-600 text-xs uppercase tracking-wider">Pending</p>
            <h3 className="mt-1 font-black text-sky-500 text-2xl md:text-3xl">{stats.pending}</h3>
          </div>
          <div className="bg-sky-500/10 p-3 rounded-2xl text-sky-500">
            <Clock size={24} />
          </div>
        </div>

        {/* On The Way */}
        <div className="flex justify-between items-center bg-base-100 shadow-sm hover:shadow-md p-5 border border-base-200 rounded-2xl transition-all duration-200">
          <div>
            <p className="font-semibold text-amber-600 text-xs uppercase tracking-wider">On The Way</p>
            <h3 className="mt-1 font-black text-amber-500 text-2xl md:text-3xl">{stats.inTransit}</h3>
          </div>
          <div className="bg-amber-500/10 p-3 rounded-2xl text-amber-500">
            <Truck size={24} />
          </div>
        </div>

        {/* Delivered */}
        <div className="flex justify-between items-center bg-base-100 shadow-sm hover:shadow-md p-5 border border-base-200 rounded-2xl transition-all duration-200">
          <div>
            <p className="font-semibold text-emerald-600 text-xs uppercase tracking-wider">Delivered</p>
            <h3 className="mt-1 font-black text-emerald-500 text-2xl md:text-3xl">{stats.delivered}</h3>
          </div>
          <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-500">
            <CheckCircle2 size={24} />
          </div>
        </div>
      </div>

      {/* Table Container Card */}
      <div className="bg-base-100 shadow-xl border border-base-200 rounded-3xl overflow-hidden">
        {/* Controls Header */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-4 bg-base-200/30 p-5 border-base-200 border-b">
          <div className="relative w-full md:w-80">
            <Search className="top-1/2 left-3.5 absolute text-base-content/40 -translate-y-1/2" size={18} />
            <input
              type="text"
              placeholder="Search sender, receiver, parcel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-base-100 py-2 pr-4 pl-10 border border-base-300 focus:border-primary rounded-xl focus:outline-none w-full text-sm transition-all"
            />
          </div>

          <div className="flex justify-between md:justify-end items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-base-100 px-3 py-1.5 border border-base-300 rounded-xl">
              <Filter size={16} className="text-base-content/50" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent focus:outline-none text-sm text-base-content cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="assigned">Assigned</option>
                <option value="in-transit">In-Transit</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <span className="bg-neutral px-3 py-1.5 rounded-xl font-semibold text-neutral-content text-xs">
              Total: {filteredParcels.length}
            </span>
          </div>
        </div>

        {/* Parcels Table */}
        <div className="overflow-x-auto">
          <table className="table w-full align-middle">
            <thead>
              <tr className="bg-base-200/50 border-base-200 border-b font-bold text-xs text-base-content/60 uppercase tracking-wider">
                <th className="py-4 pl-6">#</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Parcel Details</th>
                <th>Cost</th>
                <th>Booking Date</th>
                <th>Status</th>
                <th>Assigned Rider</th>
                <th className="pr-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200/60 text-sm">
              {filteredParcels.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-16 font-medium text-base-content/50 text-center">
                    <div className="flex flex-col justify-center items-center gap-2">
                      <Package size={40} className="opacity-40 stroke-1" />
                      <p>No parcels found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredParcels.map((parcel, index) => (
                  <tr key={parcel.id || parcel._id} className="hover:bg-base-200/40 transition-colors">
                    <td className="pl-6 font-bold text-xs text-base-content/40">{index + 1}</td>
                    <td>
                      <div className="font-bold text-base-content">{parcel.senderName || 'N/A'}</div>
                      <div className="text-xs text-base-content/50">{parcel.senderEmail}</div>
                    </td>
                    <td>
                      <div className="font-medium text-base-content">{parcel.receiverName || 'N/A'}</div>
                      <div className="text-xs text-base-content/50">{parcel.receiverPhone || 'N/A'}</div>
                    </td>
                    <td>
                      <span className="bg-base-200 px-2.5 py-1 rounded-lg font-semibold text-xs text-base-content/80">
                        {parcel.parcelType || 'Document'}
                      </span>
                    </td>
                    <td className="font-black text-primary">${parcel.cost || 0}</td>
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
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize inline-flex items-center gap-1.5 ${getStatusBadge(parcel.status)}`}>
                        <span className="bg-current rounded-full w-1.5 h-1.5"></span>
                        {parcel.status || 'pending'}
                      </span>
                    </td>
                    <td>
                      {parcel.assignedRiderName ? (
                        <div className="flex items-center gap-2.5">
                          <div className="flex justify-center items-center bg-primary/10 rounded-full w-8 h-8 font-bold text-primary text-xs">
                            {parcel.assignedRiderName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-xs text-base-content">{parcel.assignedRiderName}</p>
                            <p className="text-[11px] text-base-content/50">{parcel.assignedRiderPhone}</p>
                          </div>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-rose-500/10 px-2.5 py-1 rounded-lg font-semibold text-rose-600 text-xs">
                          <span className="bg-rose-500 rounded-full w-1.5 h-1.5 animate-pulse"></span> Unassigned
                        </span>
                      )}
                    </td>
                    <td className="pr-6 text-center">
                      <button
                        onClick={() => {
                          setSelectedParcel(parcel);
                          setSelectedRiderId(parcel.assignedRiderId || '');
                          document.getElementById('assign_rider_modal').showModal();
                        }}
                        className={`btn btn-xs md:btn-sm rounded-xl font-semibold gap-1 transition-all ${
                          parcel.status === 'pending'
                            ? 'btn-primary shadow-md shadow-primary/20'
                            : 'btn-outline border-base-300 hover:bg-base-200 text-base-content'
                        }`}
                      >
                        {parcel.status === 'pending' ? <UserPlus size={14} /> : <UserCheck size={14} />}
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
      <dialog id="assign_rider_modal" className="modal-bottom backdrop-blur-sm modal sm:modal-middle">
        <div className="bg-base-100 shadow-2xl p-6 border border-base-200 rounded-3xl modal-box">
          <div className="flex justify-between items-center mb-5 pb-4 border-base-200 border-b">
            <h3 className="flex items-center gap-2 font-bold text-base-content text-xl">
              <span className="bg-primary/10 p-2 rounded-xl text-primary">🚴</span> Assign Delivery Rider
            </h3>
            <button
              type="button"
              className="text-base-content/50 hover:text-base-content btn btn-sm btn-circle btn-ghost"
              onClick={() => document.getElementById('assign_rider_modal').close()}
            >
              <X size={18} />
            </button>
          </div>

          {selectedParcel && (
            <form onSubmit={handleAssignSubmit} className="space-y-5">
              {/* Selected Parcel Quick Info */}
              <div className="space-y-2 bg-base-200/50 p-4 border border-base-200 rounded-2xl text-xs">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1 text-base-content/60">
                    <Package size={14} /> Parcel Category:
                  </span>
                  <span className="font-bold text-base-content">{selectedParcel.parcelType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1 text-base-content/60">
                    <MapPin size={14} /> Receiver Address:
                  </span>
                  <span className="max-w-[200px] font-semibold text-base-content text-right truncate">
                    {selectedParcel.receiverAddress || 'N/A'}
                  </span>
                </div>
              </div>

              {/* Rider Select Input */}
              <div className="space-y-2">
                <label className="block font-bold text-xs text-base-content/70 uppercase tracking-wider">
                  Select Active Rider
                </label>
                <select
                  value={selectedRiderId}
                  onChange={(e) => setSelectedRiderId(e.target.value)}
                  required
                  className="focus:border-primary rounded-xl focus:outline-none w-full text-sm select-bordered select"
                >
                  <option value="" disabled>Choose an active deliveryman</option>
                  {riders.map((rider) => (
                    <option key={rider.id || rider._id} value={rider.id || rider._id}>
                      {rider.name || rider.displayName} — {rider.district || 'All Districts'} ({rider.phone || rider.phoneNumber || 'No Phone'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-base-200 border-t modal-action">
                <button
                  type="button"
                  className="rounded-xl font-semibold text-xs btn btn-ghost btn-sm"
                  onClick={() => document.getElementById('assign_rider_modal').close()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="shadow-md shadow-primary/20 px-5 rounded-xl font-semibold text-xs btn btn-primary btn-sm"
                  disabled={assignRiderMutation.isPending}
                >
                  {assignRiderMutation.isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Assigning...
                    </>
                  ) : (
                    'Confirm Assignment'
                  )}
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