import { useState } from "react";
import { account } from "../api/appwrite.cjs";
import { useNavigate } from "react-router-dom";
import Google from "../assets/google.svg";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Handle Login with Email & Password
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await account.createEmailPasswordSession(email, password);
            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
        }
    };

    // Handle Login with Google OAuth
    const handleGoogleLogin = async () => {
        try {
            account.createOAuth2Session(
                "google",
                "http://localhost:5173/dashboard", // Redirect on success
                "http://localhost:5173/login"  // Redirect on failure
            );
        } catch (error) {
            console.error("Google Login Error:", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen" style={{ backgroundImage: 'url(https://picsum.photos/2400/1800)', backgroundSize: 'cover' }}>
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full outline outline-2 outline-gray-300">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 outline outline-1 outline-gray-300"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 outline outline-1 outline-gray-300"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600 transition duration-300 outline outline-1 outline-gray-300">
                    Login
                </button>

                <div className="mt-4 flex justify-center">
                    <button
                        onClick={handleGoogleLogin}
                        type="button"
                        className="bg-gray-100 text-black p-3 rounded w-full flex items-center justify-center hover:bg-gray-300 transition duration-300 shadow-md outline outline-1 outline-gray-300"
                    >
                        <img src={Google} alt="Google" className="w-6 h-6 mr-2" />
                        Login with Google
                    </button>
                </div>
                <p className="mt-6 text-center text-gray-600">
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                </p>
                <h1 className="text-center mt-4 text-gray-600 text-xs">
                    By signing up for this service, you agree to our <a href="/terms" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>.
                </h1>
            </form>
                

        </div>
     
    );
};

export default Login;
