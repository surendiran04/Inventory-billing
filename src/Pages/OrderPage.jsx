import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/nav';
import Modal from 'react-modal';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStatusPopup, setShowStatusPopup] = useState(false); 
  const [orderStatus, setOrderStatus] = useState(''); 
  const location = useLocation();
  const { cid } = location.state || {};

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(`http://localhost:3001/order/list/${cid}`);
        console.log(response.data[0].status_name);
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          console.error('Response data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (cid) {
      fetchOrders();
    }
  }, [cid]);

  const handleRowClick = async (order) => {
    setSelectedOrder(order);
    try {
      const response = await axios.post(`http://localhost:3001/order/order-items/${order.order_id}`);
      const products = response.data.map(item => ({
        ...item,
        name: item.name,
        price: item.price_per_unit,
        quantity: item.quantity,
        unit: item.unit
      }));
      setSelectedOrder((prevOrder) => ({
        ...prevOrder,
        products: products,
      }));
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const toggleStatusPopup = () => {
    setShowStatusPopup(!showStatusPopup);
  };

  const handleViewStatus = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:3001/order/status/${orderId}`);
      setOrderStatus(response.data.status);
      toggleStatusPopup();
    } catch (error) {
      console.error('Error fetching order status:', error);
    }
  };

  const handleReadyToGet = (orderId) => {
    console.log(`Order ${orderId} is ready to get.`);
   
  };

  const handleCompleted = (orderId) => {
    console.log(`Order ${orderId} is completed.`);
    
  };

  const calculateTotal = (products) => {
    if (!products || products.length === 0) {
      return 0;
    }
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <div className="w-screen h-screen flex flex-row">
      
      <div className="fixed w-full">
        <Navbar cid={cid} />
      </div>
      <div className="w-screen h-screen flex flex-row mt-21" style={{ marginTop: '70px' }}>
        <div className="w-1/2 border-r-2 border-gray-300 overflow-y-auto">
          <div className="bg-gray-100 p-4 h-full w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Order Table</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-400 text-white">
                  <th className="p-2 border">Order ID</th>
                  <th className="p-2 border w-1/4">Ordered At</th>
                  <th className="p-2 border w-1/4">Status</th>

                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.order_id}
                    className="cursor-pointer hover:bg-gray-200"
                    onClick={() => handleRowClick(order)}
                  >
                    <td className="p-2 border text-center">{order.order_id}</td>
                    <td className="p-2 border text-center w-1/4">{order.createdAt}</td>
                    <td className="p-2 border text-center w-1/4">{order.status_name}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Right Side */}
        <div className="w-1/2 overflow-y-auto">
          <div className="bg-white p-4 h-full w-full">
            {selectedOrder ? (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-center">Order {selectedOrder.order_id}</h2>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-400 text-white">
                      <th className="p-2 border">Product Name</th>
                      <th className="p-2 border">Price</th>
                      <th className="p-2 border">Quantity</th>
                      <th className="p-2 border">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.products?.map((product, index) => (
                      <tr key={index}>
                        <td className="p-2 border text-center">{product.name}</td>
                        <td className="p-2 border text-center">₹{product.price}</td>
                        <td className="p-2 border text-center">{product.quantity} {product.unit}</td>
                        <td className="p-2 border text-center">₹{product.price * product.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-right mt-4">
                  <h3 className="text-xl font-bold">Total: ₹{calculateTotal(selectedOrder.products)}</h3>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Select an order to see the details</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Order Status Popup */}
      <Modal
        isOpen={showStatusPopup}
        onRequestClose={toggleStatusPopup}
        contentLabel="Order Status Popup"
        className="order-status-modal bg-white p-8 rounded-lg shadow-lg w-96"
        overlayClassName="order-status-overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="order-status-content">
          <h2 className="text-xl font-bold mb-4">Order Status</h2>
          <p className="mb-4">{orderStatus}</p>
          <button
            onClick={() => toggleStatusPopup()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Order;
