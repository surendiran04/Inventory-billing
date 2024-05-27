import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './RegistrationStyle.module.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/register-customer', formData);
      if (response.status === 200) {
        setSuccessMessage('Registration successful! Please login to continue.');
        setErrorMessage('');
        setFormData({
          email: '',
          name: '',
          password: '',
        });
      } else {
        setErrorMessage('Registration failed. Please try again later.');
        setSuccessMessage('');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          setErrorMessage('Cannot register, you already have an account.');
        } else if (error.response.status === 500) {
          setErrorMessage('Server error.');
        } else {
          setErrorMessage('Error: ' + error.response.data.message);
        }
      } else {
        setErrorMessage('Error sending data: ' + error.message);
      }
      setSuccessMessage('');
    }
  };

  const handlePopupClose = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const squares = [];
  for (let i = 0; i < 5; i++) {
    squares.push(
      <div key={i} className={styles.square} style={{ "--i": i }}></div>
    );
  }

  return (
    <div className='flex justify-center items-center w-screen h-screen bg-[#bfc9dd] overflow-hidden'>
      <div className='h-3/5 w-3/5 flex justify-center items-center relative'>
        {squares}
        <div className={`${styles.container} w-[350px] shadow-lg bg-[#8697C4] h-[375px]`}>
          <h2 className='pb-5 justify-center flex font-bold text-lg'>Customer Registration</h2>
          <form className='flex justify-center' onSubmit={handleSubmit}>
            <div>
              <input
                placeholder='Email'
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div>
              <input
                placeholder='Name'
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder='Password'
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <button className={`${styles.submitButton} font-bold border-none`} type="submit">Register</button>
          </form>
          <div className='flex flex-row justify-center items-center'>
            <p className={`${styles.text1} flex justify-center text-lg`}>
              Already have an account?
            </p>
            <p className={`${styles.text2} flex justify-center`}>
              <Link className='pl-1 font-bold text-lg' to="/customer-login"> Login</Link>
            </p>
          </div>
          {errorMessage && (
            <div className={styles.popup}>
              <div className={styles.popupContent}>
                <p>{errorMessage}</p>
                <button onClick={handlePopupClose}>Close</button>
              </div>
            </div>
          )}
          {successMessage && (
            <div className={styles.popup}>
              <div className={styles.popupContent}>
                <p>{successMessage}</p>
                <button onClick={handlePopupClose}><Link to="/customer-login">Login</Link></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;