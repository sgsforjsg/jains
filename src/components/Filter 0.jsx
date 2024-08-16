// src/components/Filter.jsx
import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaRedo } from 'react-icons/fa';
import { checkAndUpdateLocalStorage } from '../services/storageService';
import { useFilter } from '../context/FilterContext';

const Filter = () => {
  const { filter, setFilter, resetFilter } = useFilter();
  const { selectedItem, inputValue, dropdownValue } = filter;
  const [items, setItems] = useState([]);

  const localStorageKey = 'allDocuments';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedData = await checkAndUpdateLocalStorage();
      //  setItems(updatedData.title);
      console.log(updatedData.localStorageKey)
      } catch (error) {
        console.error('Error fetching and updating data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFilter({ ...filter, inputValue: value, selectedItem: value, dropdownValue: value });
  };

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    setFilter({ ...filter, dropdownValue: value, inputValue: value });
  };

  const handleItemClick = (item) => {
    setFilter({ ...filter, selectedItem: item, inputValue: item });
  };

  return (
    <div className="p-4">
      <div className="mb-2 flex items-center space-x-2">
        <div className="relative inline-block w-40">
          <select
            value={dropdownValue}
            onChange={handleDropdownChange}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-2 py-1 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select an option</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <FaChevronDown />
          </div>
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="px-2 py-1 border rounded focus:outline-none focus:shadow-outline"
          placeholder="Type here..."
        />
        <button
          onClick={resetFilter}
          className="p-1 bg-red-500 text-white rounded-full hover:bg-red-700 focus:outline-none"
          title="Reset Filter"
        >
          <FaRedo />
        </button>
      </div>
      <div className="flex overflow-x-auto space-x-2 py-2">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex-shrink-0 px-4 py-2 cursor-pointer whitespace-nowrap ${
              selectedItem === item ? 'bg-blue-500 text-white' : 'bg-gray-200'
            } rounded-lg text-center`}
            onClick={() => handleItemClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
