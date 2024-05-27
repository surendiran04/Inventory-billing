import React, { useState } from 'react';
import axios from 'axios';

const PayOrder = () => {
  const [orderId, setOrderId] = useState('');


  const handleOrderNow = async () => {
    try {
      const response = await axios.post('http://localhost:3001/order/create-order/dhinagar775@gmail.com', {
        amount: 1000, // Amount in paise (e.g., ₹10 = 1000 paise)
        currency: 'INR',
        items:
    [{
    product_id:23,
    quantity:2
    },
    {
    product_id:22,
    quantity:5
    }]  // Currency code
      });
      console.log(response.data);
      const Id  = response.data;
     
  
      
      const endpoint = `http://localhost:3001/order/update-order/${Id}`; 
      console.log(endpoint);


      // Create a new instance of Razorpay from the global scope
      const razorpay = new window.Razorpay({
        
        key: 'rzp_test_CFpUbryUIn6bk4',
        amount: 1000, // Amount in paise (e.g., ₹10 = 1000 paise)
        currency: 'INR',
        order_id: orderId,
        name: 'Your Store Name',
        description: 'Order Description',
        handler: async function (response) {
          // Handle successful payment
          console.log('Payment successful:',endpoint, response);
          await axios.post(endpoint, {
        status: "paid"});
        },
        prefill: {
          name: 'John Doe',
          email: 'dhinagar775@gmail.com',
          contact: '6381242908',
        },
      });
      razorpay.open();
    } catch (error) {
      console.error('Error creating order:', error);


    }
  };

  return (
    <div>
      <button onClick={handleOrderNow}>Order Now</button>
    </div>
  );
};

export default PayOrder;