import React from 'react'
const Footer = () => {
  return (
    <footer className="bg-[rgb(26,26,26)] text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-lg font-semibold mb-2">Your Footer Content</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400 transition duration-300">
            Home
          </a>
          <a href="#" className="hover:text-gray-400 transition duration-300">
            About
          </a>
          <a href="#" className="hover:text-gray-400 transition duration-300">
            Services
          </a>
          <a href="#" className="hover:text-gray-400 transition duration-300">
            Contact
          </a>
        </div>
        <div className="mt-4">
          <p>&copy; {new Date().getFullYear()} Your Company Name</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer