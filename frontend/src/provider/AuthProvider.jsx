import { useEffect, useLayoutEffect, useState } from 'react';
import api from '@/lib/api';
import { AuthContext } from '@/context/authContext';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return sessionStorage.getItem('token') || null;
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', token);
    } else {
      sessionStorage.removeItem('token');
    }
  }, [token]);

  // Fetch logged-in user when app starts
  useEffect(() => {
    const fetchMe = async () => {
      if (!token) return;
      try {
        const response = await api.get('/user/me');
        setUser(response.data.user);
      } catch {
        setToken(null);
        setUser(null);
      }
    };
    fetchMe();
  }, [token]);

  // Attach token to every request
  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      if (!config._retry && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => api.interceptors.request.eject(authInterceptor);
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        // console.log(error);
        if (
          error.response.status === 401 &&
          error.response.data.message === 'No token provided'
        ) {
          try {
            // Make the refresh token call
            const response = await api.post('/auth/refresh'); // uncomment this
            const newToken = response.data.token;

            setToken(newToken); // update state
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            originalRequest._retry = true;

            return api(originalRequest); // retry original request with new token
          } catch (err) {
            setToken(null);
            setUser(null);
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => api.interceptors.response.eject(refreshInterceptor);
  }, []);

  const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const register = async (data) => {
    const response = await api.post('/auth/register', data);
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        register,
        logout,
        setToken,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
