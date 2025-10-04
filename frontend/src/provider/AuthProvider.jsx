import { useEffect, useLayoutEffect, useState } from 'react';
import api from '@/lib/api';
import { AuthContext } from '@/context/authContext';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => sessionStorage.getItem('token') || null,
  );
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  // Keep token in storage in sync
  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', token);
    } else {
      sessionStorage.removeItem('token');
      setUser(null);
      sessionStorage.removeItem('user');
    }
  }, [token]);

  // Keep user in storage in sync
  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }, [user]);

  // Fetch logged-in user when app starts
  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        console.log('Top');
        const response = await api.get('/user/me');
        setUser(response.data.user);
      } catch {
        setToken(null);
        setUser(null);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
      } finally {
        setLoading(false);
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
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => api.interceptors.response.eject(refreshInterceptor);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', credentials);
      setToken(response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/register', data);
      setToken(response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post('/auth/logout');
    } finally {
      setToken(null);
      setUser(null);
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
