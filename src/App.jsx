// App.js
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import Pay from './Pages/Pay';
import CustomerPage from './Pages/CustomerPage';
import Navbar from './Components/Navbar';
import OrderPage from './Pages/OrderPage';
import CartPage from './Pages/CartPage';
import SettingsPage from './Pages/Setting';
import AdminOrder from './Pages/adminOrder';
//import SearchBar from './Components/SearchBar';



const App = () => {
  

  return (
    
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Registration />} />
            <Route path='/admin' element={<Login role='admin' />} />
            <Route path='/customer-login' element={<Login role='customer' />} />
            <Route path='/pay' element={<Pay />} />
            <Route path='/navbar' element={<Navbar />}/>
            <Route path='/orderpage' element={<OrderPage />}/>
            <Route path='/cartpage' element={<CartPage />}/>
            <Route path='/settings' element={<SettingsPage />}/>
            <Route path='/admin-orders' element={<AdminOrder />}/>
          </Routes>
    </BrowserRouter>
  );
}

export default App;
