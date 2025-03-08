import React, { useEffect, useState } from 'react'
import miku from "../../assets/miku.jpg"
import { account, storage, ID } from "../../api/appwrite.config.js"

function UserAccount() {
    const [userID, setUserID] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const getUserID = async () => {
        try {
            const userData = await account.get();
            setUserID(userData.$id);
            console.log(userID);
        } catch (error) {
            console.log(error);
        }
    }
useEffect(() => {
    getUserID();
}, []);
    const newProfilePicture = async () => {
        try {
            
        } catch (error) {

        }

    }
  return (
    <div>
        <form>
            
        </form>
      <h2 className="text-xl font-bold mt-4">User Account</h2>
      <p className="text-gray-600">Manage your account settings.</p>
      <img 
        src={miku}
        alt="Miku"
        className="w-32 h-32 rounded-full mt-4"
      />
    </div>
  )
}

export default UserAccount;