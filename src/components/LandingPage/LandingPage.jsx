import React from 'react';
import { motion } from 'framer-motion';

function LandingPage() {
    console.warn("Page is still in development. Please check back later.");
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white">
            <motion.header 
                className="text-center mb-8"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-5xl font-bold mb-4">Notes App</h1>
                <p className="text-xl">Organize your thoughts, tasks, and ideas effortlessly.</p>
            </motion.header>

            <main className="text-center">
                <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="text-3xl font-semibold mb-4">Why Choose Notes App?</h2>
                    <p className="text-lg">Simple, fast, and easy to use. Access your notes anywhere, anytime.</p>
                </motion.div>

                <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h2 className="text-3xl font-semibold mb-4">Get Started</h2>
                    <p className="text-lg mb-4">Sign up now and start organizing your life.</p>
                    <motion.button 
                        className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-blue-100 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a href='/signup'>
                        Sign Up
                        </a>
                    </motion.button>
                </motion.div>
            </main>

            <motion.footer 
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <p className="text-sm">© 2023 Notes App. All rights reserved.</p>
            </motion.footer>
        </div>
    );
}

export default LandingPage;