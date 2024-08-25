import React, { useState, useEffect } from 'react';
import ReindexCollection from './ReindexCollection';

const DeleteLocalStorageData = () => {
  const [availableData, setAvailableData] = useState([]);
  const [selectedData, setSelectedData] = useState({});

  // Fetch available data keys from localStorage on component mount
  useEffect(() => {
    const fetchData = () => {
      const dataKeys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        dataKeys.push(key);
      }
      setAvailableData(dataKeys); // Save available data keys to state
    };

    fetchData();
  }, []);

  // Handle checkbox selection
  const handleCheckboxChange = (key) => {
    setSelectedData((prevSelectedData) => ({
      ...prevSelectedData,
      [key]: !prevSelectedData[key], // Toggle selection
    }));
  };

  // Handle deletion of selected data from localStorage
  const handleDelete = () => {
    Object.keys(selectedData).forEach((key) => {
      if (selectedData[key]) {
        localStorage.removeItem(key); // Delete data from localStorage
      }
    });

    // After deletion, refresh available data
    const newAvailableData = availableData.filter((key) => !selectedData[key]);
    setAvailableData(newAvailableData); // Update the displayed data
    setSelectedData({}); // Reset the selected data state
  };

  return (
    <div className="p-4 bg-gray-100">
      <ReindexCollection/>
      <h2 className="text-xl font-semibold mb-4">Admin Screen</h2>
      
     
      <h2 className="text-xl font-semibold bg-gray-200 mb-4">Delete Local Storage Data</h2>
      {availableData.length === 0 ? (
        <p>No data available in localStorage.</p>
      ) : (
        <div>
          <ul>
            {availableData.map((key) => (
              <li key={key} className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  checked={!!selectedData[key]} // Checkbox status based on selection
                  onChange={() => handleCheckboxChange(key)} // Handle checkbox selection
                  className="mr-2"
                />
                <label>{key}</label>
              </li>
            ))}
          </ul>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          >
            Delete Selected Data
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteLocalStorageData;
