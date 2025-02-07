//to do list
// add markdowns using mdx




import React, { useState } from 'react';
import { databases } from '../api/appwrite.cjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

function NewNote() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const notifyError = () => toast.error('Error creating note');
    const notify = () => toast.success('Note created successfully');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await databases.createDocument(
                '679a016a0007d89e8356', // databaseId
                '679a016f0005a850c549', // collectionId
                'unique()', // documentId
                {
                    Name: name,
                    Description: description,
                    Content: content,
                    Date: date
                }, // data
                ["read(\"any\")"] // permissions (optional)
            );
            console.log('New Note:', result);
            notify();
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (error) {
            console.error('Error creating document:', error);
            notifyError();
        }
        setName('');
        setDescription('');
        setContent('');
        setDate('');
    };

    return (
        <div className="max-w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create a New Note</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Content:</label>
                    <Editor
                        apiKey="your-tinymce-api-key"
                        value={content}
                        onEditorChange={(newContent) => setContent(newContent)}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                        }}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Date:</label>
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="flex justify-between mt-4">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Add Note
                    </button>
                    <a href="/dashboard" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Back to Dashboard
                    </a>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default NewNote;
