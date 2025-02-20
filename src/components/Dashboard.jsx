import { useEffect, useState } from "react";
import { account, databases } from "../api/appwrite.cjs";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaPen, FaRegCircle } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import { Query } from "appwrite";
import { IoSettings } from "react-icons/io5";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID; // Replace with your actual Database ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID; // Replace with your actual Collection ID

// Function to get user data
const GetUserData = async () => {
  try {
    const userData = await account.get();
    console.log(userData)
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

const Dashboard = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [documents, setDocuments] = useState([]); // State to store documents
  const [selectedDocuments, setSelectedDocuments] = useState([]); // State to store selected documents
  const navigate = useNavigate(); // Hook to navigate between routes

  // Effect to check user authentication
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await GetUserData();
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
  const handleSettings = async () => {
    try {
      const userData = await GetUserData();
      if (userData) {
        navigate(`/settings/${userData.$id}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      navigate("/");
    }

  
  }
    
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

  return (
    <div className="flex flex-col items-center h-screen">
      <button 
        onClick={handleLogout} 
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded absolute top-4 right-4 transition duration-300 transform hover:scale-105"
      >
        Logout
      </button>

      <IoSettings className="text-4xl text-gray-500 absolute top-4 left-4 hover: cursor-pointer" onClick={handleSettings} />

      <h1 className="text-3xl font-bold mt-4 animate-fade-in">Welcome, {user?.name}!</h1>
      <h2 className="text-xl font-semibold mt-6 animate-fade-in">Your notes:</h2>

      <div className="flex flex-row items-start justify-center flex-grow flex-wrap">
        <ul className="mt-4 px-2 flex flex-row flex-wrap rounded-lg">
          {documents.length > 0 ? (
            documents.map((doc) => (
              <div
                key={doc.$id}
                className={`relative w-64 h-64 px-2 shadow-teal-500 m-2 rounded-lg transition duration-300 transform hover:scale-105 ${
                  selectedDocuments.includes(doc.$id) ? <IoIosCheckmarkCircle className="absolute top-2 left-2 text-green-500" /> : ''
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

                <div className="bg-white h-64 rounded-lg text-black border border-gray-300 overflow-hidden">
                  <li className="p-2 border-b m-2 font-bold">{doc.Name}</li>
                  <li className="p-2 border-b rounded-md">{doc.Description}</li>
                  <li className="p-2 border-b">{renderContent(doc.Content)}</li>
                  <li className="p-2 border-b">{formatDate(doc.Date)}</li>
                  <li className="p-2 border-b">{doc.$id}</li>
                  

                  <button 
                    className="p-2 border-t flex items-center justify-center w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300 rounded-b-lg"
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

      <a className="fixed bottom-4 right-4 text-blue-500 transition duration-300 transform hover:scale-110" href="/new">
        <FaPen className="text-3xl text-blue-500" />
      </a>
      
      {selectedDocuments.length > 1 && (
        <button 
          onClick={MassDelete}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 transform hover:scale-105"
        >
          Delete all selected
        </button>
      )}

      {selectedDocuments.length === 1 && (
        <button 
          onClick={Delete}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 transform hover:scale-105"
        >
          Delete
        </button>
      )}
      
      <ToastContainer />
    </div>
  );
};

export default Dashboard;