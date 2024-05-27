import React, { useState } from 'react';
import axios from 'axios';

function AddDia({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    unit: '',
    image: null,
    stock_quantity: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithImage = new FormData();
    formDataWithImage.append('name', formData.name);
    formDataWithImage.append('description', formData.description);
    formDataWithImage.append('price', formData.price);
    formDataWithImage.append('unit', formData.unit);
    formDataWithImage.append('image', formData.image);
    formDataWithImage.append('stock_quantity', formData.stock_quantity);

    try {
      const response = await axios.post('http://localhost:3001/product/create-product', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response.data);
      onSubmit();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className='' >
      <div className="max-w-lg mx-auto bg-white rounded-lg flex justify-center items-center flex-col">
      <h2 className="text-2xl font-bold mb-4 text-black">Add Product</h2>
      <form  onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-2">
          <input
            type="Text"
            placeholder='Name'
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md shadow-sm border-black sm:text-sm"
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder='Description'
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border "
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder='Price'
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-[40px] border "
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder='Unit'
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="flex justify-center mt-1  w-full text-sm border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-[40px] border "
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full text-sm border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  border "
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder='Stock Quantity'
            id="stock_quantity"
            name="stock_quantity"
            value={formData.stock_quantity}
            onChange={handleChange}
            className="mt-1 block w-full text-sm border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-[40px] border "
          />
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
    </div>
    
  );
}

export default AddDia;