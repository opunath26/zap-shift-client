import React from 'react';
import useAuth from '../../../hooks/useAuth';

const SocialLogin = ( {type} ) => {

    const { signInGoogle } = useAuth();

    const handleGoogleSignIn = () => {
        signInGoogle()
            .then((result) => {
                console.log(result.user);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div>
            <button onClick={handleGoogleSignIn} className="flex justify-center items-center gap-2 py-3 border rounded-lg w-full">
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5"
                />
                {
                    type === 'login' ? 'Login with Google' : 'Register with Google'
                }
            </button>
        </div>
    );
};

export default SocialLogin;