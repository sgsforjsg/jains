


import { databases, Query } from '../appwriteConfig'; // Ensure you import your Appwrite client setup


const databaseId = '66376eba000eb9cc6797';
const collectionId = '663773e1002a4fe7be40';
const bucket_id='66389165001ab8078701'
export const getLastUpdatedDocument = async () => {
  try {
    const response = await databases.listDocuments(databaseId, collectionId, [
      Query.orderDesc('$createdAt'),
      Query.limit(1)
    ] );
    return response.documents[0];
  } catch (error) {
    console.error('Error fetching last updated document:', error);
    throw error;
  }
};

export const getAllDocuments = async (collectionId) => {
  try {
    const response = await databases.listDocuments(databaseId, collectionId,[
      Query.limit(1000)
    ] );
    return response.documents;
  } catch (error) {
    console.error('Error fetching all documents:', error);
    throw error;
  }
};
