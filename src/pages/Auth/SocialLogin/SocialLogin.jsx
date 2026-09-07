import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const SocialLogin = ({ type }) => {
    const { signInGoogle } = useAuth();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        setLoading(true);
        signInGoogle()
            .then((result) => {
                setLoading(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome!',
                    text: `Signed in as ${result.user?.displayName || 'User'}`,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2500,
                });
                navigate(location?.state || '/');
            })
            .catch((error) => {
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Google Sign-In Failed',
                    text: error.message || 'Could not authenticate with Google.',
                    confirmButtonColor: '#03373D',
                });
            });
    };

    return (
        <div>
            <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="flex justify-center items-center gap-3 bg-white disabled:opacity-50 shadow-sm hover:shadow px-4 py-3 border border-gray-200 hover:border-[#03373D] rounded-xl w-full font-bold text-[#03373D] text-sm active:scale-[0.99] transition-all cursor-pointer"
            >
                {loading ? (
                    <span className="text-[#03373D] loading loading-spinner loading-sm"></span>
                ) : (
                    <>
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span>
                            {type === 'login' ? 'Login with Google' : 'Register with Google'}
                        </span>
                    </>
                )}
            </button>
        </div>
    );
};

export default SocialLogin;