import { Client, Account, Databases } from "appwrite";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
    .setProject("6799a4b900175da7cb61"); // Your Project ID

export const account = new Account(client);
export const databases = new Databases(client);
