import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RiderDashboard = ({ userEmail, riderId }) => {
  const [wallet, setWallet] = useState({
    collectedCash: 0,
    totalEarning: 0,
    currentBalance: 0,
  });
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash_in_hand');
  const [trxId, setTrxId] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Fetch Rider Wallet Data
  const fetchWallet = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/rider/wallet/${userEmail}`);
      setWallet(res.data);
    } catch (err) {
      console.error('Error fetching wallet:', err);
    }
  };

  useEffect(() => {
    if (userEmail) fetchWallet();
  }, [userEmail]);

  // 2. Submit Cash Handover Request
  const handleCashHandover = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    try {
      setLoading(true);
      await axios.post('http://localhost:3000/cash-handover', {
        riderId: riderId || wallet.id,
        riderEmail: userEmail,
        amount: parseFloat(amount),
        paymentMethod,
        trxId,
      });

      alert('Cash handover request submitted successfully!');
      setAmount('');
      setTrxId('');
      fetchWallet(); // Refresh wallet data
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to submit request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 mx-auto p-6 max-w-4xl">
      {/* ========================================== */}
      {/* 📊 1. Stats Section                         */}
      {/* ========================================== */}
      <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
        {/* Collected Cash */}
        <div className="bg-amber-50 shadow-sm p-5 border border-amber-200 rounded-xl">
          <h3 className="font-medium text-amber-800 text-sm">Collected Cash (Cash in Hand)</h3>
          <p className="mt-2 font-bold text-amber-900 text-2xl">
            ৳ {wallet.collectedCash || 0}
          </p>
        </div>

        {/* Total Earnings */}
        <div className="bg-emerald-50 shadow-sm p-5 border border-emerald-200 rounded-xl">
          <h3 className="font-medium text-emerald-800 text-sm">Total Earnings</h3>
          <p className="mt-2 font-bold text-emerald-900 text-2xl">
            ৳ {wallet.totalEarning || 0}
          </p>
        </div>

        {/* Current Balance */}
        <div className="bg-blue-50 shadow-sm p-5 border border-blue-200 rounded-xl">
          <h3 className="font-medium text-blue-800 text-sm">Current Balance</h3>
          <p className="mt-2 font-bold text-blue-900 text-2xl">
            ৳ {wallet.currentBalance || 0}
          </p>
        </div>
      </div>

      {/* ========================================== */}
      {/* 📝 2. Cash Handover Form                   */}
      {/* ========================================== */}
      <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-800 text-xl">Submit Cash Handover Request</h2>
        
        <form onSubmit={handleCashHandover} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Amount
            </label>
            <input
              type="number"
              placeholder="Enter amount to handover"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="cash_in_hand">Cash in Hand (Office Counter)</option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>

          {paymentMethod !== 'cash_in_hand' && (
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">
                Transaction ID (TrxID)
              </label>
              <input
                type="text"
                placeholder="Enter Transaction ID"
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded-lg w-full font-medium text-white transition duration-200"
          >
            {loading ? 'Processing...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RiderDashboard;