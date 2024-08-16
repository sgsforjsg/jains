// src/pages/Admin.jsx
import React from 'react';
import ReindexCollection from '../components/ReindexCollection';

const Admin = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Home Page</h2>
      <ReindexCollection />
      {/* Other content */}
    </div>
  );
};

export default Admin;
