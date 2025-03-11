import { useState } from "react";
import { account } from "../api/appwrite.config.js";
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
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-light-blue-200 to-light-purple-100">
            
            <form onSubmit={handleSignup} className="bg-white dark:bg-dark-700 p-8 rounded-lg shadow-lg max-w-md w-full animate-fade-in opacity-100">
                <h2 className="text-3xl font-bold mb-6 text-center text-dark-800 dark:text-light-blue-100">Sign Up</h2>

                <input
                    type="text"
                    placeholder="Name"
                    className="p-3 border rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-light-purple-500 dark:bg-dark-600 dark:text-neutral-100 dark:border-dark-500"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="p-3 border rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-light-purple-500 dark:bg-dark-600 dark:text-neutral-100 dark:border-dark-500"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-3 border rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-light-purple-500 dark:bg-dark-600 dark:text-neutral-100 dark:border-dark-500"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <button type="submit" className="bg-light-purple-500 text-white p-3 rounded w-full hover:bg-light-purple-600 transition duration-300 hover:animate-pulse-fast">
                    Sign Up
                </button>

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleGoogleSignIn}
                        type="button"
                        className="bg-neutral-100 dark:bg-dark-600 text-dark-800 dark:text-neutral-100 p-3 rounded w-full hover:bg-neutral-200 dark:hover:bg-dark-500 transition duration-300 flex items-center justify-center shadow-md outline outline-1 outline-neutral-300 dark:outline-dark-500"
                    >
                        <img src={Google} alt="Google" className="w-6 h-6 mr-2" />
                        Sign In with Google
                    </button>
                </div>
                <h1 className="text-center mt-4 text-dark-700 dark:text-neutral-300">
                    Already have an account? <a href="/login" className="text-light-blue-700 hover:text-light-blue-500 dark:text-light-blue-300">Login</a>
                </h1>
                <h2 className="text-center mt-4 text-neutral-600 dark:text-neutral-400 text-xs">
                    By signing up, you agree to our <a href="/terms" className="text-light-blue-700 hover:text-light-blue-500 dark:text-light-blue-300">Terms and Conditions</a>
                </h2>
            </form>
        </div>
    );
};

export default Signup;
