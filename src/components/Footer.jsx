import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-yellow-100 dark:bg-gray-800 shadow-lg ">
      <div className="container mx-auto px-4 py-6 flex flex-col items-center">
        <p className="text-gray-600 dark:text-gray-300">&copy; {new Date().getFullYear()} MindMaple. All rights reserved.</p>
        <div className="flex space-x-4 mt-2">
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
