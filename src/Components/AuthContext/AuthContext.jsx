import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, isLoggedIn } from '/src/apiConection.js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

    useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authenticated = await isLoggedIn();
        setIsAuthenticated(authenticated);
      } catch (error) {
        setError('Error al verificar la autenticación');
      }
    };
    checkAuthentication();
}, []);

  const login = async (email, password) => {
    try {
      const token = await apiLogin(email, password);
      if (token) {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setError('Falló el inicio de sesión. Por favor, verifica tus credenciales.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
