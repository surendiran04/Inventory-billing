import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post('http://localhost:3001/order/list'); // Adjust the URL to match your backend endpoint
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setOrders(response.data);
          setFilteredOrders(response.data); // Initialize filtered orders
        } else {
          console.error('Response data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [filterStatus, orders]);

  const handleRowClick = async (order) => {
    setSelectedOrder(order);
    try {
      const response = await axios.post(`http://localhost:3001/order/order-items/${order.order_id}`); // Adjust the URL to match your backend endpoint
      const products = response.data.map(item => ({
        ...item,
        name: item.name, // Adjust according to the actual response structure
        price: item.price_per_unit,
        quantity: item.quantity, // Adjust according to the actual response structure
        unit: item.unit // Adjust according to the actual response structure
      }));
      setSelectedOrder((prevOrder) => ({
        ...prevOrder,
        products: products,
      }));
      console.log(products);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const handleViewClick = (order) => {
    handleUnderProcessing(order.order_id);
    // Set the order to selected and mark it as viewed
    setOrders(orders.map(o => o.order_id === order.order_id ? { ...o, status_name: 'under processing' } : o));
  };

  const handleReadyToGet = (orderId) => {
    handleUpdateStatus(orderId, 'ready');
    // Mark the order as ready
    setOrders(orders.map(o => o.order_id === orderId ? { ...o, status_name: 'ready' } : o));
  };

  const handleCompleted = (orderId) => {
    handleUpdateStatus(orderId, 'completed');
    // Mark the order as completed
    setOrders(orders.map(o => o.order_id === orderId ? { ...o, status_name: 'completed' } : o));
  };

  const handleUpdateStatus = async (orderId, statusName) => {
    try {
      const response = await axios.post('http://localhost:3001/order/updatestat', {
        order_id: orderId,
        status_name: statusName,
      });
      console.log(`Order ${orderId} status updated to ${statusName}:`, response.data);
    } catch (error) {
      console.error(`Error updating order ${orderId} to ${statusName}:`, error);
    }
  };

  const handleUnderProcessing = (orderId) => {
    handleUpdateStatus(orderId, 'under processing');
  };

  const calculateTotal = (products) => {
    if (!products || products.length === 0) {
      return 0;
    }
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const filterOrders = () => {
    if (filterStatus === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status_name === filterStatus));
    }
  };

  return (
    <div className="w-screen h-screen flex flex-row">
      {/* Left Side */}
      <div className="w-1/2 border-r-2 border-gray-300 overflow-y-auto">
        <div className="bg-gray-100 p-4 h-full w-full">
          <h2 className="text-2xl font-bold mb-4 text-center text-black">Order Table</h2>
          <div className="mb-4 text-center">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="all">All</option>
              <option value="queue">Queue</option>
              <option value="under processing">Under Processing</option>
              <option value="ready">Ready to Get</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#245bae] text-white">
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Customer ID</th>
                <th className="p-2 border w-1/3">Ordered At</th>
                <th className="p-2 border w-1/3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredOrders) && filteredOrders.map((order) => (
                <tr
                  key={order.order_id}
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => handleRowClick(order)}
                >
                  <td className="p-2 border text-center">{order.order_id}</td>
                  <td className="p-2 border text-center">{order.customer_id}</td>
                  <td className="p-2 border text-center w-1/3">{order.createdAt}</td>
                  <td className="p-2 border text-center w-1/3">
                    {order.status_name === 'queue' ? (
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewClick(order);
                        }}
                      >
                        Start Processing
                      </button>
                    ) : null}
                    {order.status_name === 'under processing' ? (
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReadyToGet(order.order_id);
                        }}
                      >
                        Ready to Get
                      </button>
                    ) : null}
                    {order.status_name === 'ready' ? (
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCompleted(order.order_id);
                        }}
                      >
                        Completed
                      </button>
                    ) : null}
                    {order.status_name === 'completed' ? (
                      <button
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                        disabled
                      >
                        Completed
                      </button>
                    ) : null}
                  </td>
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
                  <tr className="bg-[#245bae] text-white">
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
         );
      };
            
  export default AdminOrder;
           