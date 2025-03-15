const databases = new sdk.Databases(client);

const DATABASE_ID = import.meta.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.VITE_APPWRITE_COLLECTION_ID;
var newFunction = async function() {
    const result = await databases.listDocuments(
        DATABASE_ID, // databaseId
        COLLECTION_ID, // collectionId
        [] // queries (optional)

    );
    console.log(result);

    return result;
}