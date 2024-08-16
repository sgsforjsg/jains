// src/appwriteConfig.js
import { Client, Account,Storage,Databases,Query } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('662dd19e0038f4956649'); // Your provided project ID

const account = new Account(client);
const databases = new Databases(client);
const storage=new Storage(client)
export { client, account,storage,databases,Query };
