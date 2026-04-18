import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/components/screens/context/AuthContext';
import AppNavigator from './src/components/screens/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}