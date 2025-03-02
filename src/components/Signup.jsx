import { useState } from "react";
import { account } from "../api/appwrite.cjs";
import { useNavigate } from "react-router-dom";
import Google from "../assets/google.svg";
const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    // Handle Manual Signup (Email & Password)
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await account.create("unique()", email, password, name);
            alert("Account created successfully!");
            navigate("/dashboard");
        } catch (error) {
            alert(error.message);
        }
    };

    // Handle Google OAuth Login
    const handleGoogleSignIn = async () => {
        try {
            account.createOAuth2Session(
                "google",
                "http://localhost:5173/dashboard", // Success URL
                "http://localhost:5173/signin" // Failure URL
            );
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen" style={{ backgroundImage: 'url(https://picsum.photos/2400/1800)', backgroundSize: 'cover' }}>
            <form onSubmit={handleSignup} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

                <input
                    type="text"
                    placeholder="Name"
                    className="p-3 border rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="p-3 border rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-3 border rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <button type="submit" className="bg-purple-600 text-white p-3 rounded w-full hover:bg-purple-700 transition duration-300">
                    Sign Up
                </button>

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleGoogleSignIn}
                        type="button"
                        className="bg-gray-100 text-black p-3 rounded w-full hover:bg-gray-300 transition duration-300 flex items-center justify-center shadow-md outline outline-1 outline-gray-300"
                    >
                        <img src={Google} alt="Google" className="w-6 h-6 mr-2" />
                        Sign In with Google
                    </button>
                </div>
                <h1 className="text-center mt-4">
                    Already have an account? <a href="/login" className="text-blue-500">Login</a>
                </h1>
                <h2 className="text-center mt-4 text-gray-600 text-xs">
                    By signing up, you agree to our <a href="/terms" className="text-blue-500">Terms and Conditions</a>
                </h2>

                
            </form>
        </div>
    );
};

export default Signup;
