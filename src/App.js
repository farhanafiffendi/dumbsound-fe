import './App.css';

import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from 'react';
import { UserContext } from './context/userContext';

// import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Auth from './pages/Auth';
import HeaderHome from './components/HeaderHome';
import NavbarUser from './components/NavbarUser';
import CardHome from './components/card/CardHome';
import HomePage from './pages/User/HomePage';
import ModalLogin from './components/modal/ModalLogin';
import HomeSuccess from './pages/User/HomeSuccess';
import AddArtist from './pages/Admin/AddArtist'
import AddMusic from './pages/Admin/AddMusic';

import { setAuthToken, API } from './config/api';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {

  let navigate = useNavigate();

  // Init user context here ...
  const [state, dispatch] = useContext(UserContext)

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/homepage');
    } else {
      if (state.user.status === 'admin') {
        navigate('/category');
      } else if (state.user.status === 'customer') {
        navigate('/');
      }
    }
  }, [state]);

  console.log(state);


  // Create function for check user token here ...
  const checkUser = async () => {
    try {
      const response = await API.get('/check');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Routes>
      <Route path='/homepage' element={<HomePage />} />
      <Route path='/Home' element={<AddMusic />} />
      <Route path='/' element={<HomeSuccess />} />
    </Routes>
  );
}

export default App;
