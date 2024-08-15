import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  updateEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.confi";
import axios from "axios";

// Social Auth Provider
const googleProvider = new GoogleAuthProvider();

// Auth Context
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update user profile
  const updateUserProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // update email
  const updateUserEmail = (email) => {
    setLoading(true);
    return updateEmail(auth.currentUser, email);
  };

  // sign in user by email and password
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign with google
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // send password reset email
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // sign out
  const userSignOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  // save user data in db
  const saveUser = async (user) => {
    const currentUser = {
      email: user?.email,
      name: user?.displayName,
      photo: user?.photoURL || "https://i.ibb.co/Jn1jJHN/avater.png",
      role: "user",
      status: "active",
      createdAt: user?.metadata.createdAt,
      lastLogin: user?.metadata.lastLoginAt,
    };
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/user`,
      currentUser
    );
    return data;
  };

  // observer user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        saveUser(currentUser);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  // console.log(user);

  const authInfo = {
    createUser,
    signInUser,
    googleLogin,
    userSignOut,
    updateUserProfile,
    updateUserEmail,
    resetPassword,
    saveUser,
    user,
    setUser,
    loading,
    setLoading,
    reload,
    setReload,
    isHovered,
    setIsHovered,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
