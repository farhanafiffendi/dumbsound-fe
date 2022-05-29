import './App.css';

import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import React, { useContext, useEffect } from 'react';
import { UserContext } from './context/userContext';

import HomePage from './pages/User/HomePage';
import HomeSuccess from './pages/User/HomeSuccess';
import AddArtist from './pages/Admin/AddArtist'
import AddMusic from './pages/Admin/AddMusic';
import MenuTransaksi from './pages/User/MenuTransaksi'
import Complain from './pages/Complain';
import ComplainAdmin from './pages/ComplainAdmin';
import MusicList from './pages/Admin/MusicList';
import ListTransaction from './pages/Admin/ListTransaction';
import NotFound from './pages/NotFound';

import { setAuthToken, API } from './config/api';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {

  // Init user context here ...
  const [state, dispatch] = useContext(UserContext)

  // Create function for check user token here ...
  const checkUser = async () => {
    try {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      const response = await API.get('/check', config);

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

  const PrivateRoute = (props) => {
    let isLogin = false
    if (localStorage.token) {
      isLogin = true
    }
    return (
      isLogin ? <Outlet /> : <Navigate to="homepage" />
    )
  }

  return (
    <>
      <Routes>
        <Route path='/homepage' element={<HomePage />} />
        <Route element={<PrivateRoute />}>
          {state.isLogin === true ? (
            <>
              {state.user.status === "admin" ? (
                <>
                  <Route path='/add-music' element={<AddMusic />} />
                  <Route path='/add-artist' element={<AddArtist />} />
                  <Route path='/complain-admin' element={<ComplainAdmin />} />
                  <Route path='/music-list' element={<MusicList />} />
                  <Route path='/list-transaction' element={<ListTransaction />} />
                </>
              ) : (
                <>
                  <Route path='/pay' element={<MenuTransaksi />} />
                  <Route path='/' element={<HomeSuccess />} />
                  <Route path='/complain' element={<Complain />} />
                  <Route path='*' element={<NotFound />} />
                </>
              )}
            </>
          ) : (
            <>
              <Route path='*' element={<HomePage />} />
            </>
          )}
        </Route>
      </Routes>
    </>
  );
}

export default App;
