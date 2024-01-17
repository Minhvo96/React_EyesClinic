// useAuth.js

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //Check for the presence of a token in localStorage or cookies
    const token = localStorage.getItem('token');

    if (token) {
      // Decode the token and set user data
      const decodedToken = jwtDecode(token);
      const userObj = JSON.parse(decodedToken.sub);
      setUser(userObj);
      setAuthenticated(true)
    } else {
      setUser(null);
      setAuthenticated(false)
    }
  }, []);


  const login = (token) => {
    if (token) {
      // Save the token in localStorage or cookies
      localStorage.setItem('token', token);

      // Decode the token and set user data
      const decodedToken = jwtDecode(token);

      const userObj = JSON.parse(decodedToken.sub);
      // Đặt cookie với tên 'JWT' và giá trị là JWT nhận được từ backend
      Cookies.set('JWT', token, { expires: 1, path: '/' });

      setUser(userObj);
      setAuthenticated(true);
    }
  };

  const logout = () => {
    // Remove the token from localStorage or cookies
    localStorage.removeItem('token');
    // Remove the token cookie
    Cookies.remove('JWT');
    setUser(null);
    setAuthenticated(false);
    navigate('/login')
  };

  return { user, authenticated, login, logout };
};

export default useAuth;
