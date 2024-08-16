// src/components/DisplayFilterValues.jsx
import React from 'react';
import { useFilter } from '../context/FilterContext';

const DisplayFilterValues = () => {
  const { filter } = useFilter();
  const { selectedItem, inputValue, dropdownValue } = filter;

  return (
    <div className="p-4">
      <h2>Filter Values:</h2>
      <p>Selected Item: {selectedItem || 'None'}</p>
      <p>Input Value: {inputValue}</p>
      <p>Dropdown Value: {dropdownValue}</p>
    </div>
  );
};

export default DisplayFilterValues;
