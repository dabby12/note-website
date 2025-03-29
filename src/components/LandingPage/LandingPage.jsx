import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpenIcon, FolderIcon, CheckCircleIcon } from 'lucide-react';
import { FaRegLightbulb } from 'react-icons/fa';

// App Screenshots (Replace with your actual image imports)
import AppScreenShot1 from '../../assets/app-screenshot1.png';
import AppScreenShot2 from '../../assets/app-screenshot2.png';
import AppScreenShot3 from '../../assets/app-screenshot3.png';

// Typewriter Component
const Typewriter = ({ speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const words = [
    "Unleash Your Productivity  ", // 26 chars
    "Capture Your Brilliant Ideas   ", // 26 chars
    "Organize Your Thoughts Easily", // 26 chars
    "Stay Productive Every Day   ", // 26 chars
    "Innovate Without Limits     ", // 26 chars
    "Create Amazing Things       ", // 26 chars
    "Sync Across All Devices     ", // 26 chars
    "Boost Your Productivity     "  // 26 chars
  ];

  useEffect(() => {
    if (currentIndex < words[currentWordIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + words[currentWordIndex][currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      // After finishing typing, wait for a moment before clearing the text
      const clearTimeoutId = setTimeout(() => {
        setDisplayText('');
        setCurrentIndex(0);
        setIsTypingComplete(true);
      }, 1000); // Adjust the delay before clearing the text (e.g., 1000ms = 1 second)

      return () => clearTimeout(clearTimeoutId);
    }
  }, [currentIndex, currentWordIndex, speed, words]);

  useEffect(() => {
    if (isTypingComplete) {
      // Move to the next word in the array
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      setIsTypingComplete(false);
    }
  }, [isTypingComplete, words.length]);

  return (
    <div className="inline-block w-full text-center whitespace-nowrap">
      <div className="inline-block min-w-[24rem] h-12 font-handwriting text-light-blue-800 text-6xl">
        {displayText}
      </div>
    </div>
  );
};
function LandingPage() {
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const screenshots = [AppScreenShot1, AppScreenShot2, AppScreenShot3];

  const features = [
    {
      icon: <BookOpenIcon className="w-12 h-12 text-light-blue-600" />,
      title: 'Unlimited Notes',
      description: 'Capture and organize unlimited notes across multiple categories and projects.',
    },
    {
      icon: <FaRegLightbulb className="w-12 h-12 text-light-green-600" />,
      title: 'Smart Organization',
      description: 'AI-powered tagging and smart search to help you find your notes instantly.',
    },
    {
      icon: <FolderIcon className="w-12 h-12 text-light-blue-600" />,
      title: 'Cross-Platform Sync',
      description: 'Seamlessly sync your notes across desktop, mobile, and web platforms.',
    },
  ];

  // Scroll-triggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // Refs for scroll-triggered animations
  const featuresRef = useRef(null);
  const screenshotRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const screenshotInView = useInView(screenshotRef, { once: true, amount: 0.2 });
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-light-blue-200 via-neutral-100 to-light-green-100 text-black px-6">
      {/* Navigation Bar */}
      <nav className="w-full max-w-6xl flex justify-between items-center py-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-light-blue-700 flex items-center"
        >
          <CheckCircleIcon className="mr-2" /> InkNote
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-x-6 hidden md:flex items-center justify-center flex-1"
        >
          {['Features', 'Pricing', 'FAQ'].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-light-blue-900 hover:text-light-blue-800 transition-colors font-medium flex items-center justify-center"
            >
              {item}
            </a>
          ))}
        </motion.div>
        <motion.a
          href="/login"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-light-blue-700 text-white px-5 py-2 rounded-full hover:bg-light-blue-800 transition-colors"
        >
          Login
        </motion.a>
      </nav>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mt-12 px-4"
      >
        <h1 className="text-6xl font-extrabold text-light-blue-800 leading-tight mb-4">
          <Typewriter speed={100} />
        </h1>
        <p className="text-2xl text-gray-600 mb-8 font-dancing_script ">
          Transform how you capture, organize, and recall your ideas with InkNote's intelligent
          note-taking platform.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex justify-center space-x-4"
        >
          <a
            href="/signup"
            className="bg-light-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-light-blue-800 transition-colors shadow-lg"
          >
            Start Free Trial
          </a>
          <a
            href="#features"
            className="border-2 border-light-blue-700 text-light-blue-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-light-blue-50 transition-colors"
          >
            Watch Demo
          </a>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="max-w-6xl mt-16 grid md:grid-cols-3 gap-8 px-4 font-Sacramento"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-all transform hover:scale-105"
            whileHover={{
              scale: 1.1,
              rotateY: 10,
              transition: { duration: 0.4 },
            }}
          >
            <div className="flex justify-center mb-4 ">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-light-blue-800 font-indie_flower">{feature.title}</h3>
            <p className="text-gray-600 font-handwriting">{feature.description}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* App Screenshots */}
      <motion.section
        ref={screenshotRef}
        initial={{ opacity: 0, y: 50 }}
        animate={screenshotInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
        className="mt-16 max-w-4xl"
      >
        <div className="flex justify-center space-x-4 mb-4">
          {screenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveScreenshot(index)}
              className={`w-3 h-3 rounded-full ${
                activeScreenshot === index ? 'bg-light-blue-700' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <motion.img
          key={activeScreenshot}
          src={screenshots[activeScreenshot]}
          alt={`App preview ${activeScreenshot + 1}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl shadow-xl transform hover:scale-105 transition-all"
        />
      </motion.section>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm py-6">
        © 2025 InkNote. Empowering Your Creativity.
      </footer>
      <b>
        <a href="/terms" className="text-blue-500 hover:text-blue-700 m-4 cursor-pointer  x">
          Terms and conditions apply.
        </a>
      </b>
    </div>
  );
}

export default LandingPage;