import React, { useState, useCallback, useEffect } from 'react';
import { databases, account } from '../api/appwrite.cjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Editable, withReact, Slate, useSlate } from 'slate-react';
import { Editor, Transforms, createEditor, Element as SlateElement } from 'slate';
import { AiOutlinePlus } from "react-icons/ai";
import { withHistory } from 'slate-history';
import { Bold, Italic, Underline, Strikethrough } from 'lucide-react';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID; // Replace with your actual Database ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID; // Replace with your actual Collection ID

const GetUserData = async () => {
    try {
        const userData = await account.get();
        console.log(userData);
        return userData;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const MarkButton = ({ format, icon: Icon }) => {
    const editor = useSlate();
    return (
        <button
            onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
            className="p-2 border rounded hover:bg-gray-200"
            tabIndex="-1"
        >
            <Icon size={18} />
        </button>
    );
};

const NewNote = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [userID, setUserID] = useState(null);
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);
    const notifyError = () => toast.error('Error creating note');
    const notify = () => toast.success('Note created successfully');
    const navigate = useNavigate();

    const [editor] = useState(() => withHistory(withReact(createEditor())));
    const initialValue = [
        {
            type: 'paragraph',
            children: [{ text: ' ' }],
        },
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await GetUserData();
            if (userData) {
                setUserID(userData.$id);
            }
        };
        fetchUserData();
    }, []);

    const renderLeaf = useCallback(({ attributes, children, leaf }) => {
        if (leaf.bold) children = <strong>{children}</strong>;
        if (leaf.italic) children = <em>{children}</em>;
        if (leaf.underline) children = <u>{children}</u>;
        if (leaf.strikethrough) children = <s>{children}</s>;
        return <span {...attributes}>{children}</span>;
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const result = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                'unique()',
                {
                    Name: name,
                    Description: description,
                    Content: JSON.stringify(editor.children),
                    Date: date.toISOString(),
                    userID: userID,
                    tags: tags.map(tag => tag.trim()) // Trim whitespace from tags
                },
                ["read(\"any\")"]
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
        setDate(new Date());
        setTags([]);
        setTagInput('');
        Transforms.delete(editor, {
            at: {
                anchor: Editor.start(editor, []),
                focus: Editor.end(editor, []),
            },
        });
    };

    const handleAddTag = () => {
        if (tagInput.trim() !== '') {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
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
                    <div className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300">
                        <Slate editor={editor} initialValue={initialValue}>
                            <div className="flex space-x-2 mb-2">
                                <MarkButton format="bold" icon={Bold} />
                                <MarkButton format="italic" icon={Italic} />
                                <MarkButton format="underline" icon={Underline} />
                                <MarkButton format="strikethrough" icon={Strikethrough} />
                            </div>
                            <Editable
                                className="min-h-[200px]"
                                placeholder="Start typing..."
                                renderLeaf={renderLeaf}
                            />
                        </Slate>
                    </div>
                </div>

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
                        <AiOutlinePlus className="ml-2 text-gray-500 font-bold text-2xl cursor-pointer" onClick={handleAddTag} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <div key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-lg flex items-center">
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

                <div className="mb-4">
                    <label className="block text-gray-700">Date:</label>
                    <input
                        type="date"
                        value={date.toISOString().split('T')[0]}
                        onChange={(e) => setDate(new Date(e.target.value))}
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
};

export default NewNote;