import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const USERS = {
  admin: { password: '123456', role: 'admin', username: 'admin' },
  cliente: { password: 'cliente123', role: 'cliente', username: 'cliente' },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const foundUser = USERS[username];
      if (foundUser && foundUser.password === password) {
        const userData = { 
          username, 
          role: foundUser.role,
          loginTime: new Date().toISOString() 
        };
        await AsyncStorage.setItem('@user_session', JSON.stringify(userData));
        setUser(userData);
        return { success: true, role: foundUser.role };
      }
      return { success: false, error: 'Credenciales inválidas' };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@user_session');
    setUser(null);
  };

  const checkSession = async () => {
    try {
      const session = await AsyncStorage.getItem('@user_session');
      if (session) {
        setUser(JSON.parse(session));
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      checkSession,
      isAdmin: user?.role === 'admin',
      isCliente: user?.role === 'cliente'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;