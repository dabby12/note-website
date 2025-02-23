import React, { useEffect, useState } from "react";
import { databases, account } from "../../api/appwrite.cjs";
import { Query, ID } from "appwrite";
import { toast } from "react-toastify";
import { MdKeyboardBackspace } from "react-icons/md";
import { GrSave } from "react-icons/gr"; 
import Sidebar from "../Special/Sidebar";

function AppPreferences() {
  const [userData, setUserData] = useState(null);
  const [preferences, setPreferences] = useState([]);
  const [prefsId, setPrefsId] = useState(null); // Store document ID in state
  const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const PREFS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PREF_COLLECTION_ID;

  const handleBack = () => window.history.back();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await account.get();
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!userData) return;

    const fetchPreferences = async () => {
      try {
        const fetchedPrefs = await databases.listDocuments(
          DATABASE_ID,
          PREFS_COLLECTION_ID,
          [Query.equal("userid", userData.$id)]
        );

        if (fetchedPrefs.documents.length > 0) {
          setPreferences(fetchedPrefs.documents);
          const docId = fetchedPrefs.documents[0].$id;
          setPrefsId(docId); // Store the document ID in state
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
        toast.error("Failed to fetch preferences.");
      }
    };

    fetchPreferences();
  }, [userData]);

  const createPrefs = async () => {
    if (!userData) return;

    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        PREFS_COLLECTION_ID,
        ID.unique(),
        {
          userid: userData.$id,
          theme: "light",
          notifications: true,
        }
      );

      setPreferences([...preferences, response]);
      setPrefsId(response.$id); // Store new prefs ID
      toast.success("Preferences created successfully!");
    } catch (error) {
      console.error("Error creating preferences:", error);
      toast.error("Error creating preferences.");
    }
  };

  const handleUpdate = async (id, field, value) => {
    try {
      await databases.updateDocument(DATABASE_ID, PREFS_COLLECTION_ID, id, {
        [field]: value,
      });

      setPreferences((prev) =>
        prev.map((pref) => (pref.$id === id ? { ...pref, [field]: value } : pref))
      );

      toast.success(`Updated ${field} successfully!`);
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      toast.error(`Failed to update ${field}.`);
    }
  };

  const updatePrefs = async () => {
    if (!prefsId) {
      toast.error("No preference document found!");
      return;
    }

    try {
      const updatedPref = await databases.updateDocument(
        DATABASE_ID,
        PREFS_COLLECTION_ID,
        prefsId, // Use the state-stored prefsId
        {
          theme: "light",
          notifications: true,
        }
      );
      
      setPreferences((prev) =>
        prev.map((pref) => (pref.$id === prefsId ? updatedPref : pref))
      );

      toast.success("Preferences updated successfully!");
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast.error("Failed to update preferences.");
    }
  };

  return (
    <div className="flex flex-col w-full mx-auto p-8 bg-gray-100 dark:bg-gray-900 min-h-screen relative">
      <Sidebar />
      <div className="absolute top-4 right-4 flex space-x-4">
        <button onClick={handleBack} className="flex items-center text-blue-500 bg-blue-100 rounded-md p-2">
          <MdKeyboardBackspace className="mr-2" />
          <span>Go back</span>
        </button>
        <button className="flex items-center text-white bg-blue-500 rounded-md p-2" onClick={updatePrefs}>
          <GrSave className="mr-2" />
          <span>Update Preferences</span>
        </button>
      </div>
      <div className="flex-1 ml-8"> 
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-2">
          App Preferences
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-8">
          Customize your experience below.
        </p>

        {preferences.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 max-w-3xl mx-auto">
            {preferences.map((pref) => (
              <div
                key={pref.$id}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                  Preference ID: {pref.$id}
                </h3>

                {/* Theme Selection */}
                <div className="mb-4">
                  <label
                    htmlFor={`theme-${pref.$id}`}
                    className="block text-lg font-medium text-gray-700 dark:text-gray-300"
                  >
                    Theme
                  </label>
                  <select
                    id={`theme-${pref.$id}`}
                    value={pref.theme || "light"}
                    onChange={(e) =>
                      handleUpdate(pref.$id, "theme", e.target.value)
                    }
                    className="mt-2 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>

                {/* Notification Settings */}
                <div className="mb-4">
                  <label
                    htmlFor={`notifications-${pref.$id}`}
                    className="block text-lg font-medium text-gray-700 dark:text-gray-300"
                  >
                    Notifications
                  </label>
                  <select
                    id={`notifications-${pref.$id}`}
                    value={pref.notifications ? "true" : "false"}
                    onChange={(e) =>
                      handleUpdate(pref.$id, "notifications", e.target.value)
                    }
                    className="mt-2 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="true">On</option>
                    <option value="false">Off</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-300 text-lg mb-4">
              No preferences found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppPreferences;
