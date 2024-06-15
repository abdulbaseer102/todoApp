'use client'
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-6xl font-bold text-blue-500">
          <Link href="/">TodoApp</Link>
        </div>
        <div className="hidden md:flex gap-[200px] text-3xl">
          <Link href="/" passHref className="text-gray-700 hover:text-blue-500">Home
          </Link>
          <Link href="/about" passHref
  className="scale-1.1 text-gray-700 hover:text-blue-500">About
          </Link>
          <Link href="/contact" passHref className="text-gray-700 hover:text-blue-500">Contact
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 hover:text-blue-500 focus:outline-none">
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4">
          <Link href="/" passHref className="text-gray-700 hover:text-blue-500">Home
          </Link>
          <Link href="/about" passHref className="text-gray-700 hover:text-blue-500">About
          </Link>
          <Link href="/contact" passHref className="text-gray-700 hover:text-blue-500">Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
