// src/context/AuthProviderWrapper.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

const AuthProviderWrapper = ({ children }) => {
  return (
    <Router>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Router>
  );
};

export default AuthProviderWrapper;
