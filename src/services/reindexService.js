// src/services/reindexService.js
import { databases } from '../appwriteConfig';
import { getAllDocuments } from './documentService';

const databaseId = '66376eba000eb9cc6797';
const collectionId = '663773e1002a4fe7be40';

export const reindexCollection = async () => {
  try {
    const allDocuments = await getAllDocuments();

    for (const document of allDocuments) {
      await databases.updateDocument(databaseId, collectionId, document.$id, {
        ...document,
        reindexed: true, // Add a trivial field to ensure update
      });
    }

    console.log('Collection reindexed successfully');
  } catch (error) {
    console.error('Error reindexing collection:', error);
  }
};
