const sdk = require('node-appwrite');

const client = new sdk.Client();
const endppoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const project = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const apikey = import.meta.env.VITE_APPWRITE_API_KEY;
client
    .setEndpoint(endppoint) // Your API Endpoint
    .setProject(project) // Your project ID
    .setKey(apikey); // Your API Key