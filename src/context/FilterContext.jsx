// src/context/FilterContext.jsx
import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState({
    selectedItem: null,
    inputValue: '',
    dropdownValue: 'Option 1',
  });

  const resetFilter = () => {
    setFilter({
      selectedItem: null,
      inputValue: '',
      dropdownValue: 'Option 1',
    });
  };

  return (
    <FilterContext.Provider value={{ filter, setFilter, resetFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
