// src/components/VerifyEmail.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { account } from '../appwriteConfig';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const verifyUser = async () => {
      const params = new URLSearchParams(location.search);
      const userId = params.get('userId');
      const secret = params.get('secret');
      if (userId && secret) {
        try {
          await account.updateVerification(userId, secret);
          setMessage('Email verification successful!');
        } catch (error) {
          setMessage(`Email verification failed: ${error.message}`);
        }
      }
    };

    verifyUser();
  }, [location]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyEmail;
