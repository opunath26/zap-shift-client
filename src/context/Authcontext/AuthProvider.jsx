import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile 
} from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const SignInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile).then(() => {
            setUser({ ...auth.currentUser });
        });
    };

    // Observer: Track user state & optionally sync with MongoDB
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser?.email) {
                const userInfo = {
                    name: currentUser.displayName,
                    email: currentUser.email,
                    image: currentUser.photoURL,
                    role: 'user',
                };

                try {
                    await axios.post('http://localhost:5000/users', userInfo);
                } catch (error) {
                    console.error("Failed to sync user with MongoDB:", error);
                }
            }

            setLoading(false);
        });

        return () => unSubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        setLoading,
        registerUser,
        SignInUser,
        signInGoogle,
        logOut,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;