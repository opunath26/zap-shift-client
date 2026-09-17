import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AdminRiderApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get('/rider-applications');
      setApplications(res.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load rider applications',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApprove = (email, name) => {
    Swal.fire({
      title: 'Approve Rider?',
      text: `Are you sure you want to approve ${name} as a rider?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, Approve!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/rider-applications/approve/${email}`);
          if (res.data.success) {
            Swal.fire('Approved!', `${name} is now a deliveryman.`, 'success');
            fetchApplications(); 
          }
        } catch (error) {
          Swal.fire('Error!', error?.response?.data?.message || 'Failed to approve', 'error');
        }
      }
    });
  };

  const handleReject = (email, name) => {
    Swal.fire({
      title: 'Reject Application?',
      text: `Are you sure you want to reject ${name}'s application?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444', // Red
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, Reject!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/rider-applications/reject/${email}`);
          if (res.data.success) {
            Swal.fire('Rejected!', `Application has been rejected.`, 'success');
            fetchApplications();
          }
        } catch (error) {
          Swal.fire('Error!', error?.response?.data?.message || 'Failed to reject', 'error');
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="border-4 border-gray-300 border-t-[#C6F16A] rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-bold text-gray-800 text-2xl">Rider Applications</h1>
          <p className="text-gray-500 text-sm">Manage and review all pending rider requests</p>
        </div>
        <span className="bg-blue-100 px-3 py-1 rounded-full font-semibold text-blue-700 text-sm">
          Total: {applications.length}
        </span>
      </div>

      {applications.length === 0 ? (
        <div className="py-10 text-gray-500 text-center">No applications found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b text-gray-600 text-sm uppercase">
                <th className="p-4">Rider Details</th>
                <th className="p-4">Contact & Region</th>
                <th className="p-4">Bike Details</th>
                <th className="p-4">Documents</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id || app.email} className="hover:bg-gray-50 transition">
                  {/* Name & Email */}
                  <td className="p-4">
                    <p className="font-semibold text-gray-800">{app.name}</p>
                    <p className="text-gray-500 text-xs">{app.email}</p>
                  </td>

                  {/* Phone & Region */}
                  <td className="p-4 text-sm">
                    <p className="text-gray-800">{app.phone}</p>
                    <p className="text-gray-500 text-xs">{app.district}, {app.region}</p>
                  </td>

                  {/* Bike Info */}
                  <td className="p-4 text-sm">
                    <p className="font-medium text-gray-800">{app.bikeModel}</p>
                    <p className="text-gray-500 text-xs">{app.bikeRegNo}</p>
                  </td>

                  {/* NID & License */}
                  <td className="p-4 text-xs">
                    <p><span className="font-semibold">NID:</span> {app.nid}</p>
                    <p><span className="font-semibold">Lic:</span> {app.license}</p>
                  </td>

                  {/* Status */}
                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${
                        app.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : app.status === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-center">
                    {app.status === 'pending' ? (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleApprove(app.email, app.name)}
                          className="bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-lg font-semibold text-white text-xs transition"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleReject(app.email, app.name)}
                          className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg font-semibold text-white text-xs transition"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs italic">No actions</span>
                    )}
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

export default AdminRiderApplications;