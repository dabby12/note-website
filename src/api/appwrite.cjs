import { Client, Account, Databases, Query, Avatars  } from "appwrite";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
    .setProject("6799a4b900175da7cb61"); // Your Project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const query = new Query();
export const avatars = new Avatars(client);
export const { create, update, listDocuments, getDocument, deleteDocument } = databases;
export const { get, updateEmail, updatePassword, deleteSession } = account;