import { useState } from "react";
import { account } from "../api/appwrite.cjs";
import { useNavigate } from "react-router-dom";
import Google from "../assets/google.svg";
import Images from "./Images";
import { OAuthProvider } from "appwrite"
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // Handle Login with Email & Password
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await account.createEmailPasswordSession(email, password);
            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle Login with Google OAuth
    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await account.createOAuth2Session(
                OAuthProvider.Google,
                "http://localhost:5173/dashboard", // Redirect on success
                "http://localhost:5173/login"  // Redirect on failure
            );
            navigate("/dashboard");
        } catch (error) {
            console.error("Google Login Error:", error);
            setError("Google login failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/3600/2400')" }}>
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl relative">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm flex justify-between items-center">
                        <span>{error}</span>
                        <button onClick={() => setError("")} className="text-red-500 hover:text-red-700">
                            ✖
                        </button>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            id="showPassword"
                            className="accent-blue-500"
                        />
                        <label htmlFor="showPassword" className="text-gray-600">Show Password</label>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 text-gray-600">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                className="accent-blue-500"
                            />
                            <span>Remember me</span>
                        </label>
                        <a href="/forgot-password" className="text-blue-500 hover:underline text-sm">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="mt-6">
                    <button
                        onClick={handleGoogleLogin}
                        type="button"
                        className="bg-gray-100 text-black p-3 rounded w-full flex items-center justify-center hover:bg-gray-300 transition duration-300 shadow-md disabled:bg-gray-400"
                        disabled={loading}
                    >
                        <img src={Google} alt="Google" className="w-6 h-6 mr-2" />
                        {loading ? "Connecting..." : "Login with Google"}
                    </button>
                </div>

                <p className="mt-6 text-center text-gray-600">
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                </p>

                <p className="text-center mt-4 text-gray-600 text-xs">
                    By signing in, you agree to our <a href="/terms" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
};

export default Login;
