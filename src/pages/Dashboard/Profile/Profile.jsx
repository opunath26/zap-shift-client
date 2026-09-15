import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { 
  FaUser, 
  FaEnvelope, 
  FaIdCard, 
  FaMotorcycle, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaShieldAlt 
} from 'react-icons/fa';

const Profile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: dbUser = {}, isLoading } = useQuery({
    queryKey: ['user-profile', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return Array.isArray(res.data) ? res.data[0] || {} : res.data;
    },
  });

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F5F5F5]">
        <span className="loading loading-spinner loading-lg text-[#84cc16]"></span>
      </div>
    );
  }

  const isRider = dbUser?.role === 'deliveryman' || dbUser?.role === 'rider';

  return (
    <div className="flex justify-center bg-[#F5F5F5] px-4 py-10 w-full min-h-screen">
      <div className="space-y-6 w-full max-w-4xl">
        
        {/* Main Profile Card */}
        <div className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 p-6 md:p-8 rounded-2xl">
          <div className="flex sm:flex-row flex-col items-center sm:items-start gap-6">
            <img
              src={user?.photoURL || dbUser?.photoURL || 'https://i.ibb.co/mR4qB2v/user-placeholder.png'}
              alt="Profile"
              className="border-4 border-[#C6F16A] rounded-full w-28 h-28 object-cover shadow-inner"
            />
            <div className="space-y-2 sm:text-left text-center">
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3">
                <h2 className="font-bold text-[#1A1A1A] text-2xl md:text-3xl">
                  {dbUser?.name || user?.displayName || 'User Name'}
                </h2>
                <span className="bg-[#C6F16A] px-3 py-1 rounded-full font-bold text-black text-xs uppercase tracking-wider">
                  {dbUser?.role || 'User'}
                </span>
              </div>
              <p className="flex justify-center sm:justify-start items-center gap-2 text-gray-600 text-sm">
                <FaEnvelope className="text-gray-400" /> {user?.email || dbUser?.email}
              </p>
              {dbUser?.phone && (
                <p className="flex justify-center sm:justify-start items-center gap-2 text-gray-600 text-sm">
                  <FaPhone className="text-gray-400" /> {dbUser?.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Rider / Deliveryman Details Section */}
        {isRider && (
          <div className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 p-6 md:p-8 rounded-2xl">
            <h3 className="flex items-center gap-2 mb-6 pb-3 border-b font-semibold text-gray-800 text-xl">
              <FaMotorcycle className="text-[#84cc16]" /> Rider Information
            </h3>

            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              {/* NID */}
              <div className="flex items-center gap-4 bg-gray-50 p-4 border border-gray-100 rounded-xl">
                <FaIdCard className="text-gray-500 text-2xl" />
                <div>
                  <p className="font-medium text-gray-500 text-xs">NID Number</p>
                  <p className="font-semibold text-gray-800">{dbUser?.nid || 'N/A'}</p>
                </div>
              </div>

              {/* License */}
              <div className="flex items-center gap-4 bg-gray-50 p-4 border border-gray-100 rounded-xl">
                <FaShieldAlt className="text-gray-500 text-2xl" />
                <div>
                  <p className="font-medium text-gray-500 text-xs">Driving License</p>
                  <p className="font-semibold text-gray-800">{dbUser?.license || 'N/A'}</p>
                </div>
              </div>

              {/* Region & District */}
              <div className="flex items-center gap-4 bg-gray-50 p-4 border border-gray-100 rounded-xl">
                <FaMapMarkerAlt className="text-gray-500 text-2xl" />
                <div>
                  <p className="font-medium text-gray-500 text-xs">Region & District</p>
                  <p className="font-semibold text-gray-800">
                    {dbUser?.district || dbUser?.region 
                      ? `${dbUser?.district || ''}${dbUser?.district && dbUser?.region ? ', ' : ''}${dbUser?.region || ''}`
                      : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Bike Details */}
              <div className="flex items-center gap-4 bg-gray-50 p-4 border border-gray-100 rounded-xl">
                <FaMotorcycle className="text-gray-500 text-2xl" />
                <div>
                  <p className="font-medium text-gray-500 text-xs">Bike Model & Reg No</p>
                  <p className="font-semibold text-gray-800">
                    {dbUser?.bikeModel 
                      ? `${dbUser?.bikeModel} ${dbUser?.bikeRegNo ? `(${dbUser?.bikeRegNo})` : ''}` 
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* About Rider */}
            {dbUser?.about && (
              <div className="bg-gray-50 mt-6 p-4 border border-gray-100 rounded-xl">
                <p className="mb-1 font-medium text-gray-500 text-xs">About Experience</p>
                <p className="text-gray-700 text-sm leading-relaxed">{dbUser?.about}</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;