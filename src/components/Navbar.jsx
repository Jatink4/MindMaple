import React from 'react';
import Clock from './Clock.jsx';
import { useDarkMode } from '../contexts/DarkModeContext.jsx';

const Navbar = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className="bg-yellow-100 dark:bg-gray-800 shadow-lg dark:shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center ">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">MindMaple</h1>
        <ul className="flex space-x-4">
          <li>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
            >
              Contact
            </a>
          </li>
        </ul>
        <div className="flex justify-between px-5 items-center">
        <Clock/>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
