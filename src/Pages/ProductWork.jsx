import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductData from './ProductData';
import DeleteDia from './DeleteDia';
import AddDia from './AddDia';
import AdminNavbar from '../Components/adminNavbar';
import { PencilIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import AdminCard from '../Components/AdminCard';
import { motion } from 'framer-motion';

function ProductWork() {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isCardVisible, setIsCardVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post('http://localhost:3001/product/list');
        const flattenedProducts = response.data.flat();
        setProducts(flattenedProducts);
        setFilteredProducts(flattenedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (!showAddProductForm || deletingProductId === null || editingProductId === null) {
      fetchProducts();
    }
  }, [showAddProductForm, deletingProductId, editingProductId]);

  useEffect(() => {
    // Filter products based on search query
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);

    // Generate suggestions based on the search query
    const suggestions = products
      .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(product => product.name);
    setSuggestions(suggestions);
  }, [searchQuery, products]);

  const handleEdit = (productId) => {
    setEditingProductId(productId);
  };

  const handleEditSubmit = async (editedProductData) => {
    try {
      await updateProductInBackend(editingProductId, editedProductData);
      setEditingProductId(null); 
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const updateProductInBackend = async (productId, updatedData) => {
    try {
      await axios.put(`http://localhost:3001/product/${productId}`, updatedData);
      console.log('Product updated successfully in the backend');
    } catch (error) {
      console.error('Error updating product in the backend:', error);
    }
  };

  const handleDelete = (productId) => {
    setDeletingProductId(productId);
  };

  const handleDeleteConfirm = async () => {
    try {
      const updatedProducts = products.filter(product => product.product_id !== deletingProductId);
      setProducts(updatedProducts);
      await deleteProductFromBackend(deletingProductId);
      setDeletingProductId(null); 
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const deleteProductFromBackend = async (productId) => {
    try {
      await axios.delete(`http://localhost:3001/product/${productId}`);
    } catch (error) {
      console.error('Error deleting product from the backend:', error);
    }
  };

  const handleDeleteCancel = () => {
    setDeletingProductId(null);
  };

  const handleAddProduct = () => {
    setShowAddProductForm(true);
  };

  const handleSubmitAddProduct = async () => {
    setShowAddProductForm(false);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setIsSearchFocused(false);
  };

  const handleRowClick = (productId) => {
    setSelectedProductId(productId);
    setIsCardVisible(true);
  };

  const handleCloseCard = () => {
    setIsCardVisible(false);
  };

  return (
    <div className=" text-black h-screen w-screen flex flex-col overflow-x-hidden">
      <AdminNavbar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        handleSearchFocus={handleSearchFocus}
        handleSearchBlur={handleSearchBlur}
        suggestions={suggestions}
        handleSuggestionClick={handleSuggestionClick}
        isSearchFocused={isSearchFocused}
      />
      <div className="container mt-20 flex flex-col ml-6 ">
       <motion.span
       >
       <button
          className="bg-blue-900 hover:bg-blue-700 hover:scale-110 transition-all text-white font-bold py-2 px-4 rounded mb-4 flex items-center"
          onClick={handleAddProduct}
        >
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          Add Product
        </button>
       </motion.span>
       <div className=' rounded-lg' >
       <table className="table-auto w-full border-collapse  border-gray-400 shadow-lg ">
          <thead className=' rounded-lg' >
            <tr className="bg-[#245bae] text-white">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Unit</th>
              <th className="px-4 py-2">Qnty</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className=' rounded-lg ' >
            {filteredProducts.map((product) => (
              <React.Fragment key={product.product_id}>
                <tr
                  className="text-center cursor-pointer hover:bg-slate-100 border border-collapse"
                  onClick={() => handleRowClick(product.product_id)}
                >
                  <td className="border px-4 py-2 ">{product.product_id}</td>
                  <td className="border px-4 py-2 ">{product.name}</td>
                  <td className="border px-4 py-2 ">{product.price_per_unit}</td>
                  <td className="border px-4 py-2 ">{product.unit}</td>
                  <td className="border px-4 py-2 ">{product.stock_quantity}</td>
                  <td className=" px-4 py-2 flex justify-center">
                   <motion.span>
                   <button
                      className="bg-blue-500 hover:bg-blue-700 hover:scale-110 transition-all text-white py-1.5 px-4 rounded mr-2 flex items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(product.product_id);
                      }}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                   </motion.span>
                    <span>
                    <button
                      className="bg-red-500 hover:bg-red-700 hover:scale-110 transition-all text-white py-1.5 px-4 rounded flex items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(product.product_id);
                      }}
                    >
                      <TrashIcon className="h- w-5" />
                    </button>
                    </span>
                  </td>
                </tr>
                {isCardVisible && selectedProductId === product.product_id && (
                  <AdminCard product={product} handleCloseCard={handleCloseCard} />
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
       </div>
      </div>
      {showAddProductForm && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow">
            <AddDia onSubmit={handleSubmitAddProduct} />
          </div>
        </div>
      )}
      {deletingProductId && (
        <DeleteDia
          productName={products.find(product => product.product_id === deletingProductId)?.name}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      )}
      {editingProductId && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow">
            <ProductData
              product={products.find(product => product.product_id === editingProductId)}
              onSubmit={handleEditSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductWork;


  