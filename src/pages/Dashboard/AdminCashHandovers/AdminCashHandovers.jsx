import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCashHandovers = ({ adminEmail }) => {
  const [handovers, setHandovers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  // 1. Fetch All Cash Handovers from Backend
  const fetchHandovers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/cash-handovers');
      setHandovers(res.data);
    } catch (err) {
      console.error('Error fetching cash handovers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHandovers();
  }, []);

  // 2. Approve Cash Handover Request
  const handleApprove = async (id) => {
    const confirmApprove = window.confirm(
      'Are you sure you want to approve this cash handover request?'
    );
    if (!confirmApprove) return;

    try {
      setProcessingId(id);
      await axios.patch(`http://localhost:3000/cash-handover/approve/${id}`, {
        adminEmail: adminEmail || 'Admin',
      });

      alert('Cash handover approved successfully!');
      fetchHandovers(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to approve handover request.');
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 font-medium text-gray-600 text-center">
        Loading requests...
      </div>
    );
  }

  return (
    <div className="space-y-6 mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center pb-4 border-b">
        <div>
          <h1 className="font-bold text-gray-800 text-2xl">
            Cash Handover Requests
          </h1>
          <p className="text-gray-500 text-sm">
            Review and approve pending cash payments submitted by riders.
          </p>
        </div>
        <button
          onClick={fetchHandovers}
          className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 text-sm transition"
        >
          Refresh
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-gray-600 text-sm text-left">
            <thead className="bg-gray-50 border-gray-200 border-b font-semibold text-gray-700 text-xs uppercase">
              <tr>
                <th className="px-4 py-3">Rider Email</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Payment Method</th>
                <th className="px-4 py-3">TrxID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {handovers.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="py-6 text-gray-500 text-center italic"
                  >
                    No cash handover requests found.
                  </td>
                </tr>
              ) : (
                handovers.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {item.riderEmail}
                    </td>
                    <td className="px-4 py-3 font-semibold text-emerald-600">
                      ৳ {item.amount}
                    </td>
                    <td className="px-4 py-3 capitalize">
                      {item.paymentMethod?.replace(/_/g, ' ')}
                    </td>
                    <td className="px-4 py-3">
                      {item.trxId ? (
                        <span className="bg-gray-100 px-2 py-1 rounded font-mono text-xs">
                          {item.trxId}
                        </span>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {item.status === 'pending' ? (
                        <span className="bg-amber-100 px-2 py-1 rounded-full font-semibold text-amber-800 text-xs">
                          Pending
                        </span>
                      ) : item.status === 'approved' ? (
                        <span className="bg-emerald-100 px-2 py-1 rounded-full font-semibold text-emerald-800 text-xs">
                          Approved
                        </span>
                      ) : (
                        <span className="bg-red-100 px-2 py-1 rounded-full font-semibold text-red-800 text-xs">
                          {item.status}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item.status === 'pending' ? (
                        <button
                          onClick={() => handleApprove(item.id)}
                          disabled={processingId === item.id}
                          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 px-3 py-1.5 rounded-lg font-medium text-white text-xs transition"
                        >
                          {processingId === item.id
                            ? 'Approving...'
                            : 'Approve'}
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs">Approved</span>
                      )}
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

export default AdminCashHandovers;