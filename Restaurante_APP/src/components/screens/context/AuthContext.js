import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const LOCAL_CREDENTIALS = {
    username: 'admin',
    password: '123456'
  };

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      if (username === LOCAL_CREDENTIALS.username && 
          password === LOCAL_CREDENTIALS.password) {
        const userData = { username, loginTime: new Date().toISOString() };
        await AsyncStorage.setItem('@user_session', JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      }
      return { success: false, error: 'Invalid credentials' };
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
      checkSession
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);