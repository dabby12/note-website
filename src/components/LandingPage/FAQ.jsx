import React, { useState } from 'react';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How do I create a new note?",
      answer: "Click on the '+' button in the navigation bar and select 'New Note'. You can then add a title and content to your note."
    },
    {
      question: "Can I organize my notes into folders?",
      answer: "Yes, you can create folders by clicking on 'Folders' in the sidebar and selecting 'New Folder'. You can then drag and drop notes into your folders."
    },
    {
      question: "How do I search for notes?",
      answer: "Use the search bar at the top of the app. You can search by title, content, or tags."
    },
    {
      question: "Can I format text in my notes?",
      answer: "Yes, you can use markdown or the formatting toolbar to bold, italicize, create lists, and more in your notes."
    },
    {
      question: "Is my data synced across devices?",
      answer: "Yes, all your notes are automatically synced across all your devices when you're connected to the internet."
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-dark-900 transition-colors duration-200">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-light-blue-700 dark:text-light-blue-300 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="border border-neutral-200 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 shadow-sm shadow-gray-200 transition-colors duration-200"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-5 py-4 text-left flex justify-between items-center hover:bg-neutral-50 dark:hover:bg-dark-600 transition-colors duration-200"
              >
                <span className="text-lg font-medium text-neutral-800 dark:text-neutral-100">
                  {item.question}
                </span>
                <svg 
                  className={`h-5 w-5 text-light-blue-500 dark:text-light-blue-300 transform ${openIndex === index ? 'rotate-180' : ''} transition-transform duration-200`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-5 py-4 border-t border-neutral-200 dark:border-dark-600 bg-light-blue-50 dark:bg-dark-800">
                  <p className="text-neutral-700 dark:text-neutral-200">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-neutral-600 dark:text-neutral-300">Can't find what you're looking for?</p>
          <a 
            href="#contact" 
            className="text-light-blue-600 dark:text-light-blue-300 font-medium hover:text-light-blue-800 dark:hover:text-light-blue-200 transition-colors duration-200"
          >
            Contact Support
          </a>
        </div>
        <div className="flex justify-center items-center space-x-4 mt-8">
          <a 
            href="/signup" 
            className="px-6 py-2 border border-light-blue-300 dark:border-light-blue-600 rounded-lg bg-pink-200 hover:bg-pink-300 text-light-blue-600 dark:text-light-blue-300 hover:text-light-blue-800 dark:hover:text-light-blue-200 transition-colors duration-200"
          >
            Done? Sign up now!
          </a>
          <a 
            href="/" 
            className="px-6 py-2 border border-light-blue-300 dark:border-light-blue-600 rounded-lg bg-pink-200 hover:bg-pink-300 text-light-blue-600 dark:text-light-blue-300 hover:text-light-blue-800 dark:hover:text-light-blue-200 transition-colors duration-200"
          >
            Not now? Back to home
          </a>
        </div>
      </main>
      
    </div>
  );
}

export default FAQ;