import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CubeIcon, ClipboardDocumentListIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import { motion } from "framer-motion"

const AdminNavbar = ({
  }) => {
  const [tooltip, setTooltip] = useState('');
  const location = useLocation();
  
  const getLinkClassName = (path) => {
    return location.pathname === path ? 'text-yellow-400' : 'text-white';
  };

  return (
    <nav className="bg-[#0a1d49] flex justify-between items-center fixed top-0 left-0 right-0 z-10 h-16 p-2">
      <div className="relative w-full max-w-lg mx-auto mt-1 pt-2.5">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={handleSearch}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          className="border border-gray-300 rounded-md px-3 py-1.5 w-full h-10"
        />
        {isSearchFocused && suggestions.length > 0 && (
          <ul className="absolute z-10 top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-md mt-0 overflow-y-auto max-h-[12rem]">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                onMouseDown={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex space-x-5 ml-0 items-center pr-2">
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.1 }}>
          <Link
            to="/admin"
            className={`font-bold flex items-center relative ${getLinkClassName('/admin')}`}
            onMouseEnter={() => setTooltip('Products')}
            onMouseLeave={() => setTooltip('')}
          >
            <CubeIcon className="h-5 w-5 mr-1" />
            Products
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.1 }}>
          <Link
            to="/admin-orders"
            className={`font-bold flex items-center relative ${getLinkClassName('/admin-orders')}`}
            onMouseEnter={() => setTooltip('Orders')}
            onMouseLeave={() => setTooltip('')}
          >
            <ClipboardDocumentListIcon className="h-5 w-5 mr-1" />
            Orders
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.1 }}>
          
        </motion.div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
