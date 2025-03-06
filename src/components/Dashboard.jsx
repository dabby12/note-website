import { useEffect, useState } from "react";
import { account, databases } from "../api/appwrite.cjs";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaPen, FaRegCircle } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import { Query } from "appwrite";
import { IoSettings } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import miku from "../assets/miku.jpg";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";  
import { GrLogout } from "react-icons/gr";
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID; // Replace with your actual Database ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID; // Replace with your actual Collection ID
const PREF_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PREF_COLLECTION_ID;
// Function to get user data


const Dashboard = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [documents, setDocuments] = useState([]); // State to store documents
  const [selectedDocuments, setSelectedDocuments] = useState([]); // State to store selected documents
  const navigate = useNavigate(); // Hook to navigate between routes
  const [preferences, setPreferences] = useState([]); // State to store preferences
  // Effect to check user authentication
  const GetUserData = async (setUser) => {
    try {
      const userData = await account.get();
      console.log(userData);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await GetUserData(setUser);
        setUser(userData);
        if (!localStorage.getItem('loggedIn')) {
          toast.success("Welcome, " + userData.name); // Show toast notification after setting user
          localStorage.setItem('loggedIn', 'true');
        }
      } catch (error) {
        navigate("/"); // Redirect to login if not logged in
      }
    };

    checkUser();
  }, [navigate]);

  // Effect to fetch documents for the authenticated user
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
          Query.equal("userID", [user.$id]), // Fetch documents by user ID
        ]);
        setDocuments(response.documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    if (user) {
      fetchDocuments();
    }
  }, [user]);

  // Function to handle user logout
  const handleLogout = async () => {
    await account.deleteSession("current");
    localStorage.removeItem('loggedIn');
    navigate("/"); // Redirect to login after logout
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to handle document selection
  const handleSelectDocument = (docId) => {
    setSelectedDocuments((prevSelected) =>
      prevSelected.includes(docId)
        ? prevSelected.filter((id) => id !== docId)
        : [...prevSelected, docId]
    );
  };
    
  // Function to delete multiple selected documents
  const MassDelete = async () => {
    alert("Are you sure you want to delete these documents?");
    try {
      for (const docId of selectedDocuments) {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, docId);
      }
      console.log("Documents deleted");
      toast.success("Documents deleted successfully");
      setSelectedDocuments([]);
      Refresh();
    } catch (error) {
      console.error("Error deleting documents:", error);
      toast.error("Error deleting documents");
    }
  };

  // Function to delete a single document
  const Delete = async (docId) => {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTION_ID,
        selectedDocuments.includes(docId) ? docId : selectedDocuments
      );
      console.log("Document deleted");
      toast.success("Document deleted successfully");
      Refresh();
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Error deleting document");
    }
  };

  // Function to refresh the page
  const Refresh = async () => {
    location.reload();
  };

  // Function to render document content
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
  const createPrefs = async () => {
    const userID = localStorage.getItem('user').$id;
    try {
      await databases.createDocument(
        DATABASE_ID,
        PREF_COLLECTION_ID,
        'unique()',
        {
          theme: "light",
          notifications: true,
          userid: userID
        },
        ["read(\"any\")"]
      );
    } catch (error) {
      console.error("Error creating preferences:", error);
    }
  };
  const fetchPrefs = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID, 
        PREF_COLLECTION_ID, 
        [Query.equal("userid", user.$id)]
      );
      setPreferences(response.documents);
      if (response.documents.length === 0) {
        createPrefs();
      } else {

        console.log("Preferences fetched successfully:", response.documents);
      }
    } catch (error) {
      console.error("Error fetching preferences:", error);
    }
  }
  useEffect(() => {
    if (user) {
      fetchPrefs();
    }
  }, [user]);
  const handleSettings = async () => {
    try {
      const userData = await GetUserData();
      if (userData) {
      const userData = await GetUserData(setUser);
      } else {
        navigate(`/settings/${preferences[0].$id}`);
      }
    } catch (error) {
      navigate("/");
    }
  }
                  
  console.error("FIX EDITSCREEN RENDER")
  return (
    <div className="flex flex-col items-center h-screen bg-light-blue-50">
      <h1 className="text-3xl font-bold mt-4 animate-fade-in text-light-blue-800">Welcome, {user?.name}!</h1>
      <h2 className="text-xl font-semibold mt-6 animate-fade-in">Your notes:</h2>
  
      <div className="flex flex-row items-start justify-center flex-grow flex-wrap">
        <ul className="mt-4 px-2 flex flex-row flex-wrap rounded-lg">
          {documents.length > 0 ? (
            documents.map((doc) => (
              <div
                key={doc.$id}
                className={`relative w-64 h-auto px-2 shadow-teal-500 m-2 rounded-lg transition duration-300 transform hover:scale-105 ${
                  selectedDocuments.includes(doc.$id) ? '' : ''
                }`}
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
                  <li className="p-2 border-b">{formatDate(doc.Date)}</li>
                  <li className="p-2 border-b">{doc.$id}</li>
  
                  {/* Display tags only if there are any */}
                  {doc.tags && doc.tags.length > 0 && (
                    <div className="p-2 border-b">
                      <strong>Tags:</strong>
                      <ul className="flex flex-wrap gap-2 mt-2">
                        {doc.tags.map((tag, index) => (
                          <li
                            key={index}
                            className="bg-gray-200 text-sm px-3 py-1 rounded-full text-gray-700 hover:bg-blue-300 transition duration-300"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
  
                  {/* Edit button */}
                  <button
                    className="p-2 bg-blue-500 text-white hover:bg-blue-600 transition duration-300 rounded-b-lg w-full mt-4 flex items-center justify-center"
                    onClick={() => navigate(`/edit/${doc.$id}`)}
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
          onClick={MassDelete}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 transform hover:scale-105 flex items-center justify-center m-4"
        >
          <MdDelete className="mr-2" /> Delete all selected
        </button>
      )}
  
      {selectedDocuments.length === 1 && (
        <button
          onClick={() => Delete(selectedDocuments[0])}
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