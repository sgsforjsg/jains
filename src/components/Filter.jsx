// src/components/Filter.jsx
import React from 'react';
import { FaRedo } from 'react-icons/fa';

const Filter = ({ filter, handleFilterChange, resetFilter, toggleLanguage, language }) => {
  return (
    
    <div className="filters flex items-center mt-4 space-x-2">
      <button className="bg-gray-300 px-2 py-1 rounded-full" onClick={toggleLanguage}>
        {language === 'eng' ? 'Guj' : 'Eng'}
      </button>
      <input
        type="text"
        name="inputValue"
        value={filter.inputValue}
        onChange={handleFilterChange}
        className="flex-1 px-2 py-1 border rounded focus:outline-none focus:shadow-outline"
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
  );
};

export default Filter;
