import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // assuming you're using react-router-dom for navigation
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

const Signin = () => {
  const { login, authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("signin handle submit triggered");
    setError('');
    try {
      await login(email, password);
      console.log("Login successful");
     // navigate('/'); // Redirect to home page after successful login
    } catch (err) {
      console.log('Login error:', err);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      {authLoading && <Spinner />}
      {error && <Alert message={error} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md" disabled={authLoading}>
          Sign In
        </button>
      </form>
      {/* <button onClick={loginWithGoogle} className="bg-red-500 text-white py-2 px-4 rounded-md mt-4" disabled={authLoading}>
        Sign In with Google
      </button> */}
    </div>
  );
};

export default Signin;
