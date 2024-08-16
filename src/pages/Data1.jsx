import React, { useState, useEffect } from 'react';
import InitialSetup from '../InitialSetup'; // InitialSetup component import करें
import Display from './Display'; // Display component import करें

const Data1 = () => {
  // employees और helpers के लिए state बनाएँ
  const [employees, setEmployees] = useState([]);
  const [helpers, setHelpers] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); // dataFetched का state, यह चेक करता है कि डेटा लाया जा चुका है या नहीं

  // जब InitialSetup से डेटा लाया जाए तो यह function call होगा
  const handleInitialDataFetched = ({ employeesData, helpersData }) => {
    setEmployees(employeesData); // employees के state को update करें
    setHelpers(helpersData); // helpers के state को update करें
    setDataFetched(true); // dataFetched को true कर दें ताकि दुबारा fetch ना हो
  };

  // Ensure InitialSetup is only called once
  useEffect(() => {
    // अगर dataFetched false है, तो sessionStorage से डेटा लें और set करें
    if (!dataFetched) {
      handleInitialDataFetched({
        employeesData: JSON.parse(sessionStorage.getItem('employeesData')) || [], // sessionStorage से employeesData लें
        helpersData: JSON.parse(sessionStorage.getItem('helpersData')) || [] // sessionStorage से helpersData लें
      });
    }
  }, [dataFetched]); // जब dataFetched बदलेगा, तभी यह effect फिर से चलेगा

  return (
    <div>
      {/* जब तक dataFetched false है, तब तक InitialSetup component दिखाएँ */}
      {!dataFetched && <InitialSetup onInitialDataFetched={handleInitialDataFetched} />}

      {/* Display component दिखाएँ, जो employees और helpers को प्रदर्शित करेगा */}
      <Display employees={employees} helpers={helpers} />
    </div>
  );
};

export default Data1;
