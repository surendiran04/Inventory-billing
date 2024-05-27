import React from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';

function AdminCard({ product, handleCloseCard }) {
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-lg relative w-96">
        <button
          className="absolute top-0 right-0 mt-2 mr-2"
          onClick={handleCloseCard}
        >
          <XCircleIcon className="h-6 w-6 text-gray-500 hover:text-gray-800" />
        </button>
        <h2 className="text-3xl font-bold mb-4 text-center">{product.name}</h2>
        <div className="flex justify-center mb-4">
          <img
            src={`http://localhost:3001/${product.image_path}`}
            alt={product.name}
            className="h-40 w-40 object-cover"
          />
        </div>
        <p className="text-lg">{product.description}</p>
      </div>
    </div>
  );
}

export default AdminCard;
