import React, { useState } from 'react';

function DeleteDia({ productName, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow flex justify-center items-center flex-col ">
        <p className='font-bold' >Are you sure you want to delete {productName}?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteDia;