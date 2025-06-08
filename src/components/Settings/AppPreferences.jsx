import React, { useEffect, useState } from "react";
import { databases, account } from "../../api/appwrite.config.js";
import { Query, ID } from "appwrite";
import { toast } from "react-toastify";
import { MdKeyboardBackspace } from "react-icons/md";
import { GrSave } from "react-icons/gr";
import Sidebar from "../Special/Sidebar";

function AppPreferences() {
  const [userData, setUserData] = useState(null);
  const [preferences, setPreferences] = useState([]);
  const [prefsId, setPrefsId] = useState(null);
  const [seasonTheme, setSeasonTheme] = useState(false);

  const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const PREFS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PREF_COLLECTION_ID;

  const handleBack = () => window.history.back();

  // Fetch user data once on mount
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

  // Fetch preferences for user
  const fetchPreferences = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PREFS_COLLECTION_ID,
      [Query.equal("userid", userData.$id)],
    );

    if (response.documents.length > 0) {
      setPreferences(response.documents);
      setPrefsId(response.documents[0].$id);
      setSeasonTheme(response.documents[0].season_theme || false);
    } else {
      console.log("No preferences found for this user.");
    }

    return response.documents;
  };

  const createPrefs = async () => {
    try {
      const newPrefs = await databases.createDocument(
        DATABASE_ID,
        PREFS_COLLECTION_ID,
        ID.unique(),
        {
          userid: userData.$id,
          theme: "light",
          notifications: true,
          season_theme: false,
          usedFreeTrial: true,
          TimeActivatedTrial: new Date().toISOString(),
          plan: "free",
        },
      );
      setPreferences([newPrefs]);
      setPrefsId(newPrefs.$id);
      setSeasonTheme(false);
      toast.success("Preferences created successfully!");
    } catch (error) {
      console.error("Error creating preferences:", error);
      toast.error("Failed to create preferences.");
    }
  };

  // Delete all but the first preferences document
  const checkPrefsx2 = async (prefs) => {
    try {
      const extras = prefs.slice(1);
      for (const pref of extras) {
        await databases.deleteDocument(
          DATABASE_ID,
          PREFS_COLLECTION_ID,
          pref.$id,
        );
        console.log("Deleted extra preferences document:", pref.$id);
      }
    } catch (error) {
      console.error("Error checking preferences:", error);
    }
  };

  // Initialize preferences once userData is available
  useEffect(() => {
    const initPrefsForUser = async () => {
      if (!userData || !userData.$id) return;

      try {
        const prefs = await fetchPreferences();

        if (prefs.length === 0) {
          await createPrefs();
        } else if (prefs.length > 1) {
          await checkPrefsx2(prefs);
        }
      } catch (error) {
        console.error("Error initializing preferences:", error);
      }
    };

    initPrefsForUser();
  }, [userData]);

  const handleUpdate = async (id, field, value) => {
    try {
      let updatedValue = value;
      if (field === "notifications" || field === "season_theme") {
        updatedValue = value === "true" || value === true;
      }

      await databases.updateDocument(DATABASE_ID, PREFS_COLLECTION_ID, id, {
        [field]: updatedValue,
      });

      setPreferences((prev) =>
        prev.map((pref) =>
          pref.$id === id ? { ...pref, [field]: updatedValue } : pref,
        ),
      );

      if (field === "season_theme") {
        setSeasonTheme(updatedValue);
      }

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
        prefsId,
        {
          theme: preferences[0]?.theme || "light",
          notifications: preferences[0]?.notifications ?? true,
          season_theme: seasonTheme,
        },
      );

      setPreferences((prev) =>
        prev.map((pref) => (pref.$id === prefsId ? updatedPref : pref)),
      );

      toast.success("Preferences updated successfully!");
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast.error("Failed to update preferences.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-64">
        <Sidebar />
      </div>

      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition"
          >
            <MdKeyboardBackspace size={24} />
            <span className="font-semibold">Go Back</span>
          </button>

          <button
            onClick={updatePrefs}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-4 py-2 transition"
          >
            <GrSave size={20} />
            <span>Save Preferences</span>
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-900 dark:text-white">
          App Preferences
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
          Customize your experience below.
        </p>

        {preferences.length > 0 ? (
          <form
            className="max-w-3xl mx-auto space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              updatePrefs();
            }}
          >
            {/* Theme */}
            <div>
              <label
                htmlFor="theme"
                className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Theme
              </label>
              <select
                id="theme"
                value={preferences[0].theme || "light"}
                onChange={(e) =>
                  handleUpdate(preferences[0].$id, "theme", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            {/* Notifications */}
            <div>
              <label
                htmlFor="notifications"
                className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Notifications
              </label>
              <select
                id="notifications"
                value={preferences[0].notifications ? "true" : "false"}
                onChange={(e) =>
                  handleUpdate(
                    preferences[0].$id,
                    "notifications",
                    e.target.value,
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="true">On</option>
                <option value="false">Off</option>
              </select>
            </div>

            {/* Season Theme */}
            <div>
              <label
                htmlFor="seasonTheme"
                className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Season Theme
              </label>
              <select
                id="seasonTheme"
                value={seasonTheme ? "true" : "false"}
                onChange={(e) =>
                  handleUpdate(
                    preferences[0].$id,
                    "season_theme",
                    e.target.value,
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="true">On</option>
                <option value="false">Off</option>
              </select>
            </div>
          </form>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-300 text-lg">
            No preferences found.
          </p>
        )}
      </main>
    </div>
  );
}

export default AppPreferences;
