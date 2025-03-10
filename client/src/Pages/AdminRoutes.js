import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import Cookies from 'js-cookie';
import Loading from './Loading';

function AdminRoutes() {
  const { isAdmin, setIsAdmin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getCsrfToken = () => {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];
    return cookieValue || '';
  };

  const authUser = async () => {
    if (isAdmin) {
      const refreshToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('refresh_token='))
        ?.split('=')[1];

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/api/token/refresh/`,
          {refresh: refreshToken },
          {
            headers: {
              'X-CSRFToken': getCsrfToken(),
            },
          }
        );

        setTimeout(() => {
          
          setIsLoading(false);
        }, 4000);
        setIsAdmin(true);
        document.cookie = `access_token=${response.data.access}; path=/;`;
      } catch (error) {
        setIsLoading(false);
        setIsAdmin(false);
        localStorage.removeItem("isAdmin")
        Cookies.remove('access_token', { path: '/' });
        Cookies.remove('refresh_token', { path: '/' });
        Cookies.remove('access_token', { path: '/admin' });
        Cookies.remove('refresh_token', { path: '/admin' });
        navigate('/');
      }
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    authUser();

    const delay = 1000 * 60 * 4; // 4 minutes
    const interval = setInterval(() => {
      authUser();
    }, delay);

    return () => clearInterval(interval);
  }, [isLoading, isAdmin]);

  if (isLoading) {
    return <Loading/>;
  } else {
    return isAdmin ? <Outlet /> : <Navigate to="/" />;
  }
}

export default AdminRoutes;
