import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 1. Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  // 2. Mutation for updating user role
  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ email, role }) => {
      const res = await axiosSecure.patch(`/users/role/${email}`, { role });
      return res.data;
    },
    onSuccess: () => {
      // Invalidate query to refresh user list instantly
      queryClient.invalidateQueries(['users']);
    },
  });

  // Role Change Handler
  const handleRoleChange = (email, newRole, userName) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to change ${userName || 'this user'}'s role to ${newRole}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateRole({ email, role: newRole });
          Swal.fire('Updated!', `User role has been updated to ${newRole}.`, 'success');
        } catch (error) {
          Swal.fire('Error!', error?.response?.data?.error || 'Failed to update role', 'error');
        }
      }
    });
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-bold text-base-content text-2xl">All Users 👥</h2>
          <p className="text-gray-500 text-sm">Manage user roles and permissions</p>
        </div>
        <div className="p-3 font-semibold badge badge-primary badge-lg">
          Total Users: {users.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200 text-base-content">
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Current Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u.id || u._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 h-10 mask mask-squircle">
                        <img
                          src={u.photoURL || 'https://i.ibb.co/mR4q38K/user.png'}
                          alt={u.name || 'User Avatar'}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{u.name || 'Anonymous'}</div>
                    </div>
                  </div>
                </td>
                <td className="font-medium text-gray-600">{u.email}</td>
                <td>
                  <span
                    className={`badge capitalize text-white font-medium ${
                      u.role === 'admin'
                        ? 'badge-error'
                        : u.role === 'deliveryman'
                        ? 'badge-warning'
                        : 'badge-info'
                    }`}
                  >
                    {u.role || 'user'}
                  </span>
                </td>
                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    {/* Make Admin Button */}
                    <button
                      onClick={() => handleRoleChange(u.email, 'admin', u.name)}
                      disabled={u.role === 'admin'}
                      className="btn-outline btn btn-xs btn-error"
                    >
                      Make Admin
                    </button>

                    {/* Make DeliveryMan Button */}
                    <button
                      onClick={() => handleRoleChange(u.email, 'deliveryman', u.name)}
                      disabled={u.role === 'deliveryman'}
                      className="btn-outline btn btn-xs btn-warning"
                    >
                      Make DeliveryMan
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;