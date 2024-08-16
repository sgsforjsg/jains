import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Filter from '../components/Filter';

const Display = ({ employees }) => {
  const [filter, setFilter] = useState({
    inputValue: '',
  });
  const [items, setItems] = useState([]); // Assume these are unique cities or departments
  const [language, setLanguage] = useState('eng'); // State for language selection
  const [selectedDetail, setSelectedDetail] = useState(null);

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  useEffect(() => {
    // Extract unique cities or departments from employees for the horizontal scroll list
    const uniqueItems = [...new Set(employees.map((employee) => toTitleCase(employee.genre)))].sort();
    setItems(uniqueItems);
  }, [employees]);

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      inputValue: value,
    }));
  };

  const resetFilter = () => {
    setFilter({
      inputValue: '',
    });
  };

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'eng' ? 'guj' : 'eng'));
  };

  const filteredEmployees = employees.filter((employee) => {
    const title = employee.title?.toLowerCase() || '';
    const genre = employee.genre?.toLowerCase() || '';
    const bdetails = employee.bdetails?.toLowerCase() || '';
    const inputValue = filter.inputValue.toLowerCase();

    return (
      !filter.inputValue ||
      title.includes(inputValue) ||
      genre.includes(inputValue) ||
      bdetails.includes(inputValue)
    );
  });

  useEffect(() => {
    console.log('employees', employees);
  }, [employees]);

  return (
    <div className="display">
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
        resetFilter={resetFilter}
        toggleLanguage={toggleLanguage}
        language={language}
      />
      
      <div className="flex overflow-x-auto space-x-2 py-0">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex-shrink-0 px-2 py-0 mb-1 cursor-pointer whitespace-nowrap ${filter.inputValue === item ? 'bg-blue-500 text-white' : 'bg-white-400'
              } rounded-lg text-center`}
            onClick={() => setFilter({ inputValue: item })}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="grid gap-4">
        {filteredEmployees.map((data) => (
          <div key={data.$id}>
            <Card
              data={data}
              language={language}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
