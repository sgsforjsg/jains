// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { account } from '../appwriteConfig';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await account.get();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      setUser(user)
      setAuthLoading(false);
      navigate('/')
    } catch (error) {
      setAuthLoading(false);
      throw error; // Ensure the error is thrown so it can be caught in the Signin component
    }
  };

  const loginWithGoogle = async () => {
    try {
      setAuthLoading(true);
      setProgress(0);

      await account.createOAuth2Session('google');
      setProgress(50);
      const user = await account.get();
      setUser(user);
      setProgress(100);
      navigate('/');
    } catch (error) {
      console.error('Google login error:', error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const signup = async (email, password, name) => {
    try {
      setAuthLoading(true);
      setProgress(0);

      await account.create('unique()', email, password, name);
      setProgress(50);
      await login(email, password);
      setProgress(100);
    } catch (error) {
      console.error('Signup error:', error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, authLoading, progress, login, logout, signup, loginWithGoogle }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
