import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeMenuScreen from '../screens/HomeMenuScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#E85D04' },
      headerTintColor: '#FFF',
      headerTitleStyle: { fontWeight: 'bold' }
    }}>
      {!user ? (
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen 
          name="HomeMenu" 
          component={HomeMenuScreen} 
          options={{ title: 'Main Menu' }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;