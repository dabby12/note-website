import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { account, databases } from "../api/appwrite.config.js";
import { Query } from "appwrite";
import { ToastContainer, toast } from 'react-toastify';
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";

// Icons
import { MdEdit, MdDelete } from "react-icons/md";
import { FaPen, FaRegCircle } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { GrLogout } from "react-icons/gr";

// Assets
import miku from "../assets/miku.jpg"


// Environment variables
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PREF_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PREF_COLLECTION_ID;

function Dashboard() {
  // State variables
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [prefsId, setPrefsId] = useState(null);
  const [plan, setPlan] = useState(null);
  const [date, setDate] = useState("");
  
  const navigate = useNavigate();

  // Trial activation notification
  useEffect(() => {
    const firstTime = localStorage.getItem("firstTime");
    if (firstTime === "true") {
      toast("Trial is activated");
      localStorage.setItem("firstTime", "false");
    }
  }, []);

  // Function to get user data
  const getUserData = async () => {
    try {
      const userData = await account.get();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  // Check user authentication
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await getUserData();
        if (!localStorage.getItem('loggedIn')) {
          if (userData) {
            toast.success(`Welcome, ${userData.name}`);
            localStorage.setItem('loggedIn', 'true');
          } else {
            navigate("/");
          }
        }
      } catch (error) {
        navigate("/");
      }
    };

    checkUser();
  }, [navigate]);

  // Fetch documents for authenticated user
  useEffect(() => {
    const fetchDocuments = async () => {
      if (!user) return;
      
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
          Query.equal("userID", [user.$id]),
        ]);
        setDocuments(response.documents);
        if (response.documents.length > 0) {
          setDate(response.documents[0].Date); // Store the first document's date
        }
        
        console.log(response.documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, [user]);

  // Create user preferences (ensures only one exists)
  const createPrefs = async () => {
    if (!user) return;
    
    try {
      // First check if any preferences exist
      const existingPrefs = await databases.listDocuments(
        DATABASE_ID,
        PREF_COLLECTION_ID,
        [Query.equal("userid", user.$id)]
      );

      // If no preferences exist, create one
      if (existingPrefs.documents.length === 0) {
        const date = new Date();
        await databases.createDocument(
          DATABASE_ID,
          PREF_COLLECTION_ID,
          'unique()',
          {
            theme: "light",
            notifications: true,
            userid: user.$id,
            usedFreeTrial: false,
            TimeActivatedTrial: date,
            plan: "free",
            custom_theme: false,
          }
        );
        localStorage.setItem('prefsCreated', 'true');
      }
      // If multiple preferences exist, delete extras
      else if (existingPrefs.documents.length > 1) {
        // Keep the first one and delete the rest
        const prefsToKeep = existingPrefs.documents[0];
        
        for (let i = 1; i < existingPrefs.documents.length; i++) {
          await databases.deleteDocument(
            DATABASE_ID,
            PREF_COLLECTION_ID,
            existingPrefs.documents[i].$id
          );
        }
        
        setPreferences([prefsToKeep]);
        setPrefsId(prefsToKeep.$id);
        localStorage.setItem('prefsId', prefsToKeep.$id);
        setPlan(prefsToKeep.plan);
      }
    } catch (error) {
      console.error("Error creating preferences:", error);
    }
  };

  // Fetch user preferences
  const fetchPrefs = async () => {
    try {
      const prefsID = localStorage.getItem("prefsId");
      if (!prefsID) {
        console.warn("No prefs ID found in local storage");
        createPrefs();
        return;
      }
  
      // Get the document by ID (remove Query.equal since it's not supported in getDocument)
      const prefsResponse = await databases.getDocument(
        DATABASE_ID,
        PREF_COLLECTION_ID,
        prefsID
      );
  
      if (!prefsResponse) {
        console.error("No preferences found");
        createPrefs();
        return;
      }
  
      setPreferences(prefsResponse);
      console.log(prefsResponse);
    } catch (error) {
      console.warn("Error fetching preferences:", error);
    }
  }; 
  
  useEffect(() => {
    fetchPrefs();
  }, [user]);
  // Verify user authentication from localStorage
  const verifyLocalStorage = () => {
    try {
      const loggedIn = localStorage.getItem('loggedIn');
      const userData = JSON.parse(localStorage.getItem('user'));
      
      if (!(userData?.email && loggedIn)) {
        navigate("/");
        localStorage.removeItem('loggedIn');
      }
    } catch (error) {
      console.error("Error checking local storage:", error);
      navigate("/");
    }
  };

  useEffect(() => { 
    verifyLocalStorage(); 
  }, []);

  // UI handlers
  const handleLogout = async () => {
    await account.deleteSession("current");
    localStorage.removeItem('loggedIn');
    navigate("/");
  };

  const handleSettings = async () => {
    const data = localStorage
    if (data === null) {
      console.error("No data found in local storage");
      navigate("/");
      return;
    }
    navigate(`/settings/${user.$id}`);
  };

  const handleSelectDocument = (docId) => {
    setSelectedDocuments((prevSelected) =>
      prevSelected.includes(docId)
        ? prevSelected.filter((id) => id !== docId)
        : [...prevSelected, docId]
    );
  };

  const deleteDocument = async (docId) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, docId);
      toast.success("Document deleted successfully");
      location.reload();
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Error deleting document");
    }
  };

  const deleteMassDocuments = async () => {
    if (!confirm("Are you sure you want to delete these documents?")) return;
    
    try {
      for (const docId of selectedDocuments) {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, docId);
      }
      toast.success("Documents deleted successfully");
      setSelectedDocuments([]);
      location.reload();
    } catch (error) {
      console.error("Error deleting documents:", error);
      toast.error("Error deleting documents");
    }
  };

  // Helper functions
  // Format date is not used in the code, but can be useful for other purposes
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderContent = (content) => {
    if (typeof content === 'string') {
      try {
        const parsedContent = JSON.parse(content);
        return parsedContent.map((block, index) => (
          <p key={index}>{block.children[0].text}</p>
        ));
      } catch (error) {
        return <p>{content}</p>;
      }
    }
    return <p>{content}</p>;
  };
  const formatDateForNote = (date) => {
    if (!date) return "Invalid date";
  
    try {
      const parsedDate = new Date(date);
      return parsedDate.toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      console.error(  "Invalid date format:", date);
      return "Invalid date";
    }
  };
  
  formatDateForNote(date);
  return (
    <div className="flex flex-col items-center h-screen bg-light-blue-50">
      <h1 className="text-3xl font-bold mt-4 animate-fade-in text-light-blue-800 font-handwriting">Welcome, {user?.name}!</h1>
      <h2 className="text-xl font-semibold mt-6 animate-fade-in">Your notes:</h2>

      <div className="flex flex-row items-start justify-center flex-grow flex-wrap">
        <ul className="mt-4 px-2 flex flex-row flex-wrap rounded-lg">
          {documents.length > 0 ? (
            documents.map((doc) => (
              <div
                key={doc.$id}
                className={`relative w-64 h-auto px-2 shadow-teal-500 m-2 rounded-lg transition duration-300 transform hover:scale-105`}
                onClick={() => handleSelectDocument(doc.$id)}
              >
                <div className="absolute top-2 right-2">
                  {selectedDocuments.includes(doc.$id) ? (
                    <IoIosCheckmarkCircle className="text-blue-500 text-lg animate-pulse" />
                  ) : (
                    <FaRegCircle className="text-gray-500 text-lg" />
                  )}
                </div>

                <div className="bg-light-blue-100 rounded-lg text-black border border-gray-400 overflow-hidden w-64 h-auto">
                  <li className="p-2 border-b m-2 font-bold">{doc.Name}</li>
                  <li className="p-2 border-b rounded-md">{doc.Description}</li>
                  <li className="p-2 border-b">{renderContent(doc.Content)}</li>
                  <li className="p-2 border-b">{formatDateForNote(doc.Date)}</li>


                  {doc.tags && doc.tags.length > 0 && (
                    <div className="p-2 border-b">
                      <strong>Tags:</strong>
                      <ul className="flex flex-wrap gap-2 mt-2">
                        {doc.tags.map((tag, index) => (
                          <li
                            key={index}
                            className="bg-gray-200 text-sm px-3 py-1 rounded-full text-gray-700 hover:bg-blue-300 transition duration-300 shadow-xl shadow-blue-300"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    className="p-2 bg-blue-500 text-white hover:bg-blue-600 transition duration-300 rounded-b-lg w-full mt-4 flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit/${doc.$id}`);
                    }}
                  >
                    <MdEdit className="mr-2" /> Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No documents found.</p>
          )}
        </ul>
      </div>

      <a className="fixed bottom-4 right-4 bg-blue-500 p-3 rounded-full shadow-lg text-white hover:bg-blue-600 transition transform hover:scale-110" href="/new">
        <FaPen className="text-2xl" />
      </a>

      {selectedDocuments.length > 1 && (
        <button
          onClick={deleteMassDocuments}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 transform hover:scale-105 flex items-center justify-center m-4"
        >
          <MdDelete className="mr-2" /> Delete all selected
        </button>
      )}

      {selectedDocuments.length === 1 && (
        <button
          onClick={() => deleteDocument(selectedDocuments[0])}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 transform hover:scale-105 flex items-center justify-center m-4"
        >
          <MdDelete className="mr-2" /> Delete
        </button>
      )}

      <Menu>
        <MenuHandler>
          <img
            src={miku}
            alt="Miku"
            className="absolute top-3 right-3 w-14 h-14 border-2 border-gray-300 rounded-full hover:cursor-pointer"
          />
        </MenuHandler>
        <MenuList className="text-sm">
          <MenuItem className="hover:text-red-500 flex items-center mb-0.5" onClick={handleLogout}>
            <GrLogout className="mr-2" /> Logout
          </MenuItem>
          <MenuItem className="hover:text-blue-500 flex items-center" onClick={handleSettings}>
            <IoSettings className="mr-2" /> Settings
          </MenuItem>
        </MenuList>
      </Menu>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;