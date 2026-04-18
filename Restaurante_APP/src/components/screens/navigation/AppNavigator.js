import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../LoginScreen';
import HomeMenuScreen from '../HomeMenuScreen';
import FoodSelectionScreen from '../FoodSelectionScreen';
import OrderSummaryScreen from '../OrderSummaryScreen';
import PurchaseHistoryScreen from '../PurchaseHistoryScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#006341' },
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
        <>
          <Stack.Screen 
            name="HomeMenu" 
            component={HomeMenuScreen} 
            options={{ title: 'Menú Principal' }}
          />
          <Stack.Screen 
            name="FoodSelection" 
            component={FoodSelectionScreen} 
            options={{ title: 'Seleccionar Comida' }}
          />
          <Stack.Screen 
            name="OrderSummary" 
            component={OrderSummaryScreen} 
            options={{ title: 'Resumen del Pedido' }}
          />
          <Stack.Screen 
            name="PurchaseHistory" 
            component={PurchaseHistoryScreen} 
            options={{ title: 'Historial de Compras' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;