import React, { useState } from 'react';
import axios from 'axios';
import ProductWork from './ProductWork';
import CustomerPage from './CustomerPage';
import styles from './Login.module.css'; 
import { useNavigate } from 'react-router-dom';


const Login = ({ role }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(true);

    const [products, setProducts] = useState([]);

    const addProduct = product => {
        setProducts([...products, product]);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // try {
        //     let endpoint = '';
        //     if (role === 'customer') {
        //         endpoint = 'http://localhost:3001/auth/customer-login';
        //     } else if (role === 'admin') {
        //         endpoint = 'http://localhost:3001/auth/admin-login';
        //     }
        //     const response = await axios.post(endpoint, { username, password });
        //     console.log(response);
        //     setLoggedIn(response);
        // } catch (error) {
        //     if (error.response) {
        //         if (error.response.status === 500) {
        //             setError('Internal server error. Please try again later.');
        //         } else {
        //             setError('Invalid credentials');
        //         }
        //     } else if (error.request) {
        //         setError('No response received from the server. Please check your connection.');
        //     } else {
        //         setError('Error sending data: ' + error.message);
        //     }
        // }
    };

    if (loggedIn) {
        if (role === 'customer') {
            return <CustomerPage cid={username} />;
        } else if (role === 'admin') {
            return <ProductWork products={products} />;
        }
    }

    const handleForgotPassword = () => {
        console.log('Forgot Password clicked');
    };

    const squares = [];
    for (let i = 0; i < 5; i++) {
        squares.push(
            <div key={i} className={styles.square} style={{ "--i": i }}></div>
        );
    }

    return (
        <div className={`${styles.login_bg} flex justify-center items-center min-h-screen bg-[#bfc9dd]`}>
            <div className=' h-3/5 w-3/5 flex justify-center items-center relative' >
                {squares}
            <div className={`${styles['login-container']} bg-[#8697C4] rounded-lg shadow-lg relative overflow-hidden flex flex-col justify-center items-center`}>  
                <h2 className="text-white">{role === 'customer' ? 'Customer Login' : 'Admin Login'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="pb-3">
                        <input
                            type="email"
                            placeholder="UserID"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                            
                            className={styles.inputField}
                        />
                    </div>
                    <div className='pb-3'>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <button  type="submit" className={styles.submitButton}>Login</button>
                </form>
                {error && <p className="text-red-500">{error}</p>}
                <div className={`${styles.forgotPassword} text-white mt-3 cursor-pointer flex items-center justify-center} onClick={handleForgotPassword`}>
                    
                </div>
            </div>
            </div>
        </div>
    );
};

export default Login;