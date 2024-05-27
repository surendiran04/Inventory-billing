import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsArrowRightShort } from 'react-icons/bs';
import Navbar from '../Components/nav';

const Cart = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const location = useLocation();
  const { cid } = location.state || {};
  const [orderId, setOrderId] = useState('');
  const [amt, setAmt] = useState(0);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/order/cartlist/${cid}`);
      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        console.error('Response data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (cid) {
      fetchOrders();
    }
  }, [cid]);

  const handleRowClick = async (order) => {
    try {
      const response = await axios.post(`http://localhost:3001/order/order-items/${order.order_id}`);
      const products = response.data.map(item => ({
        ...item,
        name: item.name,
        price: item.price_per_unit,
        quantity: item.quantity,
        unit: item.unit
      }));
      setSelectedOrder({
        ...order,
        products: products,
      });
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const handleRemoveFromCart = async (orderId) => {
    try {
      await axios.post(`http://localhost:3001/order/deletecart/${orderId}`);
      setOrders(orders.filter(order => order.order_id !== orderId));
      if (selectedOrder && selectedOrder.order_id === orderId) {
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleOrderNow = async (Id) => {
    try {
      setOrderId(Id);
      console.log(amt, orderId);
      
      const razorpay = new window.Razorpay({
        key: 'rzp_test_CFpUbryUIn6bk4',
        amount: amt,
        currency: 'INR',
        order_id: orderId,
        name: 'Your Store Name',
        description: 'Order Description',
        handler: async function (response) {
          await axios.post(`http://localhost:3001/order/update-order/${Id}`, {
            status: "paid"
          });
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
      });
      razorpay.open();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  useEffect(() => {
    if (selectedOrder) {
      const total = calculateTotal(selectedOrder.products);
      setAmt(total * 100);
    }
  }, [selectedOrder]);

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

      <div className="w-screen h-screen flex flex-row" style={{ marginTop: '70px' }}>
        <div className="w-1/2 border-r-2 border-gray-300 overflow-y-auto">
          <div className="bg-gray-100 p-4 h-full w-full rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-black">Cart Table</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#263c6f] text-white">
                  <th className="p-2 border w-1/6">Order ID</th>
                  <th className="p-2 border w-1/3">Ordered At</th>
                  <th className="p-2 border w-1/2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.order_id}
                    className="cursor-pointer hover:bg-gray-200"
                    onClick={() => handleRowClick(order)}
                  >
                    <td className="p-2 border w-1/6 text-center">{order.order_id}</td>
                    <td className="p-2 border w-1/3 text-center">{order.createdAt}</td>
                    <td className="p-2 border w-1/2 text-center">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2 relative"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReadyToGet(order.order_id);
                        }}
                      >
                        <AiOutlineDelete 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFromCart(order.order_id);
                          }} 
                          className="inline-block" 
                        />
                        <span className="absolute top-full left-0 w-full text-center -mt-4 opacity-0 pointer-events-none transition-opacity duration-200 bg-black text-white text-xs rounded py-1">
                          Remove from Cart
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-1/2 overflow-y-auto">
          <div className="bg-white p-4 h-full w-full rounded-lg animate-fade-in">
            {selectedOrder ? (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-center text-black">Cart ID {selectedOrder.order_id}</h2>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#263c6f] text-white">
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
                <div className="text-center mt-4">
                <h3 className="text-xl font-bold">Total: ₹{amt / 100}</h3>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mt-4 transition-colors duration-300 hover:bg-green-600"
                    onClick={() => handleOrderNow(selectedOrder.order_id)}
                  >
                    Order Now
                  </button>
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
    </div>
  );
};

export default Cart;
