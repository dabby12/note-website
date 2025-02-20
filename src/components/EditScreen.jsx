// src/components/EditScreen.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { account, databases } from '../api/appwrite.cjs';
import { MdSave, MdDelete, MdCancel } from 'react-icons/md';
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID; // Replace with your actual Database ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID; // Replace with your actual Collection ID

function EditScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        console.log('Fetching note with ID:', id);
        const response = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
        console.log('Fetched note:', response);
        const formattedDate = new Date(response.Date).toISOString().split('T')[0];
        setNote({ ...response, Date: formattedDate });
      } catch (error) {
        console.error('Error fetching note:', error);
        setError('Error fetching note');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleSave = async () => {
    try {
      console.log('Saving note:', note);
      const { $databaseId, $collectionId, ...noteData } = note;
      const result = await databases.updateDocument(
        DATABASE_ID, // databaseId
        COLLECTION_ID, // collectionId
        note.$id, // documentId
        noteData, // data
        ["read(\"any\")"] // permissions
      );
      console.log('Note saved:', result);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving note:', error);
      setError('Error saving note');
    }
  };

  const handleDelete = async () => {
    try {
      console.log('Deleting note with ID:', id);
      const result = await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      console.log('Note deleted:', result);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting note:', error);
      setError('Error deleting note');
    }
  };

  const handleCancel = () => {
    console.log('Cancel editing');
    navigate('/dashboard');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <button onClick={() => account.deleteSession("current").then(() => navigate("/"))} className="mt-4 bg-red-500 text-white px-4 py-2 rounded absolute top-4 right-4">
        Logout
      </button>
      <h1 className="text-3xl font-bold mt-4">Edit Note</h1>
      {note && (
        <div className="w-full max-w-4xl mt-6 shadow-lg p-6 rounded-lg outline-1 outline outline-gray-500">
          <input
            type="text"
            value={note.Name}
            onChange={(e) => setNote({ ...note, Name: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Title"
          />
          <textarea
            value={note.Description}
            onChange={(e) => setNote({ ...note, Description: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Description"
          />
          <textarea
            value={note.Content}
            onChange={(e) => setNote({ ...note, Content: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Content"
          />
          <input
            type="date"
            value={note.Date}
            onChange={(e) => setNote({ ...note, Date: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
          />
          <div className="flex justify-between">
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
              <MdSave className="mr-2" /> Save
            </button>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded flex items-center">
              <MdDelete className="mr-2" /> Delete
            </button>
            <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded flex items-center">
              <MdCancel className="mr-2" /> Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditScreen;
