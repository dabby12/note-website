import { useEffect, useState } from "react";
import { account, databases } from "../api/appwrite.cjs";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaPen, FaRegCircle } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';

const DATABASE_ID = "679a016a0007d89e8356";  // Replace with your actual Database ID
const COLLECTION_ID = "679a016f0005a850c549";  // Replace with your actual Collection ID

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
        toast.success("Welcome, " + userData.name); // Show toast notification after setting user
      } catch (error) {
        navigate("/"); // Redirect to login if not logged in
      }
    };

    const fetchDocuments = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        setDocuments(response.documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    checkUser();
    fetchDocuments();
  }, [navigate]);

  const handleLogout = async () => {
    await account.deleteSession("current");
    navigate("/"); // Redirect to login after logout
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSelectDocument = (docId) => {
    setSelectedDocuments((prevSelected) =>
      prevSelected.includes(docId)
        ? prevSelected.filter((id) => id !== docId)
        : [...prevSelected, docId]
    );
  };

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

  const Refresh = async () => {
    location.reload();
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <button 
        onClick={handleLogout} 
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded absolute top-4 right-4 transition duration-300 transform hover:scale-105"
      >
        Logout
      </button>

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
                  <li className="p-2 border-b">{doc.Content}</li>
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
