import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';

const SocialLogin = ({ type }) => {
    const { signInGoogle } = useAuth();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location?.state?.from?.pathname || location?.state || '/';

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const result = await signInGoogle();
            const user = result.user;

            // Save user info to MongoDB
            const userInfo = {
                name: user?.displayName,
                email: user?.email,
                photoURL: user?.photoURL,
                role: 'user',
            };

            await axios.post('http://localhost:3000/users', userInfo);

            setLoading(false);

            Swal.fire({
                icon: 'success',
                title: 'Welcome!',
                text: `Signed in as ${user?.displayName || 'User'}`,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
            });

            navigate(from, { replace: true });
        } catch (error) {
            setLoading(false);
            console.error('Google Sign-In Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Google Sign-In Failed',
                text: error.message || 'Could not authenticate with Google.',
                confirmButtonColor: '#03373D',
            });
        }
    };

    return (
        <div className="w-full">
            <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="group relative flex justify-center items-center gap-3 bg-white hover:bg-[#03373D]/5 disabled:opacity-50 shadow-sm hover:shadow px-4 py-3 border border-gray-200 hover:border-[#03373D]/30 rounded-xl w-full overflow-hidden font-semibold text-gray-700 hover:text-[#03373D] text-xs sm:text-sm active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
                {loading ? (
                    <span className="text-[#03373D] loading loading-spinner loading-sm"></span>
                ) : (
                    <>
                        <div className="bg-gray-50 group-hover:bg-white p-1 rounded-full transition-colors">
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                className="w-4 sm:w-5 h-4 sm:h-5"
                            />
                        </div>
                        <span>
                            {type === 'login' ? 'Continue with Google' : 'Sign up with Google'}
                        </span>
                    </>
                )}
            </button>
        </div>
    );
};

export default SocialLogin;