import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLastUpdatedDocument, getAllDocuments } from './services/documentService';

const InitialSetup = ({ onInitialDataFetched }) => {
  const [statusMessage, setStatusMessage] = useState("Checking for data availability...");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // सबसे पहले localStorage से डेटा प्राप्त करें और component को भेजें
        let employeesData = JSON.parse(localStorage.getItem('employeesData')) || [];
        let helpersData = JSON.parse(localStorage.getItem('helpersData')) || [];
        console.log(employeesData);

        // अगर localStorage में डेटा है, तो उसे तुरंत component को भेजें
        if (employeesData.length || helpersData.length) {
          const localDataMsg = "Data available locally, sending to component...";
          setStatusMessage(localDataMsg);
          console.log(localDataMsg);  // Log to console
          toast.info(localDataMsg);
          onInitialDataFetched({ employeesData, helpersData });
        }

        // अब Appwrite के साथ compare करने के लिए last update times को fetch करें
        const checkUpdateMsg = "Checking if data needs to be updated from cloud...";
        setStatusMessage(checkUpdateMsg);
        console.log(checkUpdateMsg);  // Log to console
        toast.info(checkUpdateMsg);

        const storedETime = localStorage.getItem('etime');
        const storedHTime = localStorage.getItem('htime');
        
        const employeesLastUpdated = await getLastUpdatedDocument('663773e1002a4fe7be40'); // Employees collection ID
        const helpersLastUpdated = await getLastUpdatedDocument('663773e1002a4fe7be40');   // Helpers collection ID
        
        // अगर storedETime नहीं है या localStorage का टाइम employees के अपडेटेड टाइम से पुराना है,
        // तो डेटा फिर से fetch करें और localStorage को अपडेट करें
        if (!storedETime || new Date(storedETime) < new Date(employeesLastUpdated.$updatedAt)) {
          const updateEmployeesMsg = "Updating Employees data from cloud...";
          setStatusMessage(updateEmployeesMsg);
          console.log(updateEmployeesMsg);  // Log to console
          toast.info(updateEmployeesMsg);
          
          employeesData = await getAllDocuments('663773e1002a4fe7be40'); // Employees collection ID

          // Sort employeesData after fetching it from cloud
          employeesData.sort((a, b) => a.title.localeCompare(b.title)); // Sorting based on 'title' field
          
          // Save the sorted employeesData to localStorage
          localStorage.setItem('etime', employeesLastUpdated.$updatedAt); // नया update time सेव करें
          localStorage.setItem('employeesData', JSON.stringify(employeesData)); // नया employeesData सेव करें
        }

        /*
        // यही लॉजिक helpersData के लिए भी लागू करें
        if (!storedHTime || new Date(storedHTime) < new Date(helpersLastUpdated.$updatedAt)) {
          const updateHelpersMsg = "Updating Helpers data from cloud...";
          setStatusMessage(updateHelpersMsg);
          console.log(updateHelpersMsg);  // Log to console
          toast.info(updateHelpersMsg);

          helpersData = await getAllDocuments('663773e1002a4fe7be40'); // Helpers collection ID
          localStorage.setItem('htime', helpersLastUpdated.$updatedAt); // नया update time सेव करें
          localStorage.setItem('helpersData', JSON.stringify(helpersData)); // नया helpersData सेव करें
        }
        */

        // sessionStorage में employeesData, helpersData, और dataFetched को सेव करें ताकि अगली बार से fetch ना हो
        sessionStorage.setItem('employeesData', JSON.stringify(employeesData));
        sessionStorage.setItem('helpersData', JSON.stringify(helpersData));
        sessionStorage.setItem('dataFetched', 'true');

        // आखिरी बार डेटा को component के ऊपर भेजें
        const dataReadyMsg = "Data is ready, sending to component...";
        setStatusMessage(dataReadyMsg);
        console.log(dataReadyMsg);  // Log to console
        toast.success(dataReadyMsg);
        onInitialDataFetched({ employeesData, helpersData });

      } catch (error) {
        const errorMsg = "Error occurred while fetching data.";
        console.error('Error fetching initial data:', error);
        setStatusMessage(errorMsg);
        console.log(errorMsg);  // Log to console
        toast.error(errorMsg);
      }
    };

    fetchInitialData(); // Component माउंट होते ही डेटा fetch की प्रक्रिया शुरू करें
  }, [onInitialDataFetched]);

  return (
    <div>
      <ToastContainer />
      <p>{statusMessage}</p>
    </div>
  );
};

export default InitialSetup;
