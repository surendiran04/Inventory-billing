import React, { useState } from 'react';

function ProductData({ product, onSubmit }) {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price_per_unit: product.price_per_unit,
    unit: product.unit,
    image: null,
    stock_quantity: product.stock_quantity,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    onSubmit(formDataToSend);
  };

  return (
    <div className=' items-center justify-center flex flex-col' >
      <h2 className='p-2 justify-center items-center flex font-bold text-lg'>Edit Product</h2>
      <form className='text-black flex flex-col w-[300px]  ' onSubmit={handleSubmit} encType="multipart/form-data">
        <div className='p-2'>
          
          <input
            type="text"
            placeholder='Name'
            className='bg-white p-1 border border-black w-[100%]'
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className='p-2'>
          
          <textarea
            rows={2}
            type="text"
            placeholder='Description'
            className='bg-white p-1 w-full border border-black '
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className='p-2'>
          <input
            type="number"
            placeholder='Price'
            className='bg-white p-1 border border-black w-[100%]'
            id="price"
            name="price_per_unit"
            value={formData.price_per_unit}
            onChange={handleChange}
          />
        </div>
        <div className='p-2'>
          <input
            type="text"
            placeholder='Unit'
            className='bg-white p-1 border border-black w-[100%]'
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
          />
        </div>
        <div className='p-2'>
          <input
            type="number"
            placeholder='Stock Quantity'
            className='bg-white p-1 border border-black w-[100%]'
            id="stock_quantity"
            name="stock_quantity"
            value={formData.stock_quantity}
            onChange={handleChange}
          />
        </div>
        <div className='p-2'>
          <input
            type="file"
            placeholder='Image'
            className='bg-white p-1 border border-black w-[100%]'
            id="image"
            name="image"
            onChange={handleChange}
          />
        </div>
        <button className=' font-bold flex bg-blue-400 justify-center items-center' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProductData;