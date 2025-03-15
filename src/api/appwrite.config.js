import { Client, Account, Databases, Avatars, Storage, ID, Query,} from "appwrite";
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const project = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const client = new Client()
    .setEndpoint(endpoint) // Using environment variable for Appwrite endpoint
    .setProject(project); // Using environment variable for Project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client); // Added Storage for file uploads
export const avatars = new Avatars(client);
export const query = Query; // Fixed export for Query (no need to instantiate it)
export const { create, update, listDocuments, getDocument, deleteDocument } = databases;
export const { get, updateEmail, updatePassword, deleteSession } = account;
export const { createFile, getFilePreview, deleteFile } = storage; // Export storage functions
export { ID }; // Export ID for generating unique ID

    