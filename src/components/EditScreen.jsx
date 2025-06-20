import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { account, databases } from "../api/appwrite.config.js";
import { Save, Trash2, X } from "lucide-react";
import { AiOutlinePlus } from "react-icons/ai";

// Slate
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

function EditScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  // Slate editor setup
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        console.log("Fetching note with ID:", id);
        const response = await databases.getDocument(
          DATABASE_ID,
          COLLECTION_ID,
          id,
        );
        console.log("Fetched note:", response);
        const formattedDate = new Date(response.Date)
          .toISOString()
          .split("T")[0];

        // Convert JSON content to Slate value
        let slateContent = [
          {
            type: "paragraph",
            children: [{ text: response.Content || "" }],
          },
        ];

        try {
          const parsed = JSON.parse(response.Content);
          if (Array.isArray(parsed)) {
            slateContent = parsed;
          } else {
            slateContent = [
              {
                type: "paragraph",
                children: [{ text: parsed.toString() }],
              },
            ];
          }
        } catch (e) {
          // Fallback to plain text if parsing fails
          slateContent = [
            {
              type: "paragraph",
              children: [{ text: response.Content || "" }],
            },
          ];
        }

        setValue(slateContent);
        setNote({ ...response, Date: formattedDate });
        setTags(response.tags || []);
      } catch (error) {
        console.error("Error fetching note:", error);
        setError("Error fetching note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleSave = async () => {
    try {
      console.log("Saving note:", note);

      // Convert editor content back to JSON
      const jsonContent = JSON.stringify(value);

      const { $databaseId, $collectionId, ...noteData } = note;
      const result = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        note.$id,
        {
          ...noteData,
          Content: jsonContent,
          tags: tags,
        },
        ['read("any")'],
      );
      console.log("Note saved:", result);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving note:", error);
      setError("Error saving note");
    }
  };

  const handleDelete = async () => {
    try {
      console.log("Deleting note with ID:", id);
      const result = await databases.deleteDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
      );
      console.log("Note deleted:", result);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting note:", error);
      setError("Error deleting note");
    }
  };

  const handleCancel = () => {
    console.log("Cancel editing");
    navigate("/dashboard");
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-center h-screen w-full">
      <button
        onClick={() =>
          account.deleteSession("current").then(() => navigate("/"))
        }
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded absolute top-4 right-4"
      >
        Logout
      </button>
      <h1 className="text-3xl font-bold mt-4">Edit Note</h1>
      {note && (
        <div className="w-full max-w-4xl mt-6 shadow-lg p-6 rounded-lg outline-1 outline outline-gray-500 ">
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

          {/* Slate editor for content */}
          <div className="w-full p-2 mb-4 border rounded min-h-[200px]">
            <Slate
              editor={editor}
              value={value}
              onChange={(newValue) => setValue(newValue)}
              initialValue={value}
            >
              <Editable
                placeholder="Enter your content here..."
                className="min-h-[200px] p-2"
              />
            </Slate>
          </div>

          <input
            type="date"
            value={note.Date}
            onChange={(e) => setNote({ ...note, Date: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
          />

          <div className="mb-4">
            <label className="block text-gray-700">Tags:</label>
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter a tag"
              />
              <AiOutlinePlus
                className="ml-2 text-gray-500 font-bold text-2xl cursor-pointer"
                onClick={handleAddTag}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-blue-200 text-blue-800 px-2 py-1 rounded-lg flex items-center"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    className="ml-2 text-red-500"
                    onClick={() => handleRemoveTag(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            >
              <Save className="mr-2" /> Save
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
            >
              <Trash2 className="mr-2" /> Delete
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded flex items-center"
            >
              <X className="mr-2" /> Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditScreen;
