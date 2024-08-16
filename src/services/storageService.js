// src/services/storageService.js
import { getLastUpdatedDocument, getAllDocuments } from './documentService';

const localStorageKey = 'listData';
const timestampKey = 'listDataTimestamp';

export const checkAndUpdateLocalStorage = async () => {
  try {
    const latestDocument = await getLastUpdatedDocument();
    const latestTimestamp = new Date(latestDocument.$createdAt).getTime();

    const storedTimestamp = localStorage.getItem(timestampKey);
    const storedData = JSON.parse(localStorage.getItem(localStorageKey));

    if (!storedTimestamp || latestTimestamp > storedTimestamp) {
      const allDocuments = await getAllDocuments();
      localStorage.setItem(localStorageKey, JSON.stringify(allDocuments));
      localStorage.setItem(timestampKey, latestTimestamp.toString());
      console.log('Local storage updated with new data:', allDocuments);
      return allDocuments;
    } else {
      console.log('Data is already updated');
      return storedData;
    }
  } catch (error) {
    console.error('Error checking and updating local storage:', error);
    return [];
  }
};
