import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCartIcon, DocumentTextIcon, CogIcon } from '@heroicons/react/24/solid'; // Assuming these icons are imported correctly
import { FaClipboardList } from "react-icons/fa";

const CustomerNavbar = ({ cid }) => {
  const [tooltip, setTooltip] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const getLinkClassName = (path) => {
    return location.pathname === path ? 'text-yellow-400' : 'text-white';
  };

  return (
    <nav className="bg-[#0a1d49] flex justify-between items-center fixed top-0 left-0 right-0 h-16 px-4 z-50">
      <div className="flex items-center space-x-6">
        

        
      </div>

      <div className="flex items-center space-x-6">
      <button
          onClick={() => navigate('/cartpage', { state: { cid } })}
          className={`font-bold flex items-center relative ${getLinkClassName('/cartpage')}`}
          onMouseEnter={() => setTooltip('Cart')}
          onMouseLeave={() => setTooltip('')}
        >
          <ShoppingCartIcon className="h-5 w-5 mr-1" />
          Cart
          {tooltip === 'Cart' && (
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2">
              Cart
            </span>
          )}
        </button>

        <button
          onClick={() => navigate('/orderpage', { state: { cid } })}
          className={`font-bold flex items-center relative ${getLinkClassName('/orderpage')}`}
          onMouseEnter={() => setTooltip('Orders')}
          onMouseLeave={() => setTooltip('')}
        >
          <DocumentTextIcon className="h-5 w-5 mr-1" />
          Orders
          {tooltip === 'Orders' && (
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2">
              Orders
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
