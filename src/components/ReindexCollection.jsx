// src/components/ReindexCollection.jsx
import React, { useState } from 'react';
import { reindexCollection } from '../services/reindexService';

const ReindexCollection = () => {
  const [loading, setLoading] = useState(false);

  const handleReindex = async () => {
    setLoading(true);
    try {
      await reindexCollection();
      alert('Collection reindexed successfully');
    } catch (error) {
      alert('Error reindexing collection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleReindex}
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
        disabled={loading}
      >
        {loading ? 'Reindexing...' : 'Reindex Collection'}
      </button>
    </div>
  );
};

export default ReindexCollection;
