import React from 'react'
import miku from "../../assets/miku.jpg"
import Sidebar from '../Special/Sidebar'
import { useState, useEffect } from 'react'
import { account } from "../../api/appwrite.cjs"
import { databases,  } from "../../api/appwrite.cjs"
import { Query } from "appwrite"
import { Users } from 'lucide-react'
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID
const PREFS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PREFS_COLLECTION_ID
function UserAccount() {
    const [userID, setUserID] = useState()
    const [NotesID, setNotesID] = useState(null);
    const getUserData = async () => {
        const userdata = await account.get()
        console.log(userdata)
        setUserID(userdata.$id)
        
        console.log(userdata.$id)
    }
    useEffect(() => {
        getUserData()
    }, [])
    console.log(userID)
    const [notesIDs, setNotesIDs] = useState([]);
    
    const listDocuments = async () => {
        try {
            const documents = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
                Query.equal("userID", [userID]), // Fetch documents by user ID
            ]);
            
            // Extract all document IDs and save them in array
            const ids = documents.documents.map(doc => doc.$id);
            setNotesIDs(ids);
            console.log(notesIDs, "notesIDs");
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    }
    

    useEffect(() => {
        if (userID) {
            listDocuments();
        }
    }, [userID]);
    const deleteDocumentsAlongWithAccount = async () => {
        try {
            for (const docID of notesIDs) {
                await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, docID);
            }
            console.log("notes deleted");
        } catch (error) {
            alert("Error deleting account: " + error.message);
    }
}

    const deleteAccount = async () => {
        try {
            await Users.delete(userID);
            await deleteDocumentsAlongWithAccount();
            alert("Account deleted successfully!");

        } catch (error) {
            alert("Error deleting account: " + error.message);
        }

    }
    return (
        <div>
            <Sidebar />
            <div className="flex flex-col items-center justify-center">
                <img src={miku} alt="miku" className="w-32 h-32 rounded-full" />
                <button 
                    onClick={deleteAccount} 
                    className='bg-red-500 text-white px-4 py-2 rounded-lg mt-4' 
                >
                    Delete account
                </button>
                <button 
                    onClick={listDocuments} 
                    className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-4'
                >
                    List Documents
                </button>
                <button onClick={deleteDocumentsAlongWithAccount} className='bg-red-500 text-white px-4 py-2 rounded-lg mt-4'> 
                    Delete test
                </button>
            </div>
        </div>
    )
}

export default UserAccount