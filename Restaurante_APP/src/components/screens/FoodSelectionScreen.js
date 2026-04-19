import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FoodCard from '../FoodCard';
import DrinkCard from '../DrinkCard';
import { foods, drinks } from './data/productsData';
import Header from '../Header';

const COLORS = {
  green: '#006341',
  red: '#CE1126',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  darkGray: '#1A1A1A',
  gold: '#D4AF37',
};

export default function FoodSelectionScreen() {
  const [foodQuantities, setFoodQuantities] = useState(
    foods.reduce((acc, food) => ({ ...acc, [food.id]: 0 }), {})
  );
  const [drinkQuantities, setDrinkQuantities] = useState(
    drinks.reduce((acc, drink) => ({ ...acc, [drink.id]: 0 }), {})
  );
  const [activeTab, setActiveTab] = useState('foods');

  const calculateTotal = () => {
    let total = 0;
    foods.forEach((food) => {
      total += food.price * foodQuantities[food.id];
    });
    drinks.forEach((drink) => {
      total += drink.price * drinkQuantities[drink.id];
    });
    return total;
  };

  const increaseQuantity = (id, type) => {
    if (type === 'food') {
      setFoodQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    } else {
      setDrinkQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    }
  };

  const decreaseQuantity = (id, type) => {
    if (type === 'food') {
      setFoodQuantities((prev) => ({
        ...prev,
        [id]: Math.max(0, prev[id] - 1),
      }));
    } else {
      setDrinkQuantities((prev) => ({
        ...prev,
        [id]: Math.max(0, prev[id] - 1),
      }));
    }
  };

  const addToCart = async () => {
    const cartItems = [];
    foods.forEach((food) => {
      if (foodQuantities[food.id] > 0) {
        cartItems.push({
          id: food.id,
          name: food.name,
          price: food.price,
          quantity: foodQuantities[food.id],
          type: 'food',
        });
      }
    });
    drinks.forEach((drink) => {
      if (drinkQuantities[drink.id] > 0) {
        cartItems.push({
          id: drink.id,
          name: drink.name,
          price: drink.price,
          quantity: drinkQuantities[drink.id],
          type: 'drink',
        });
      }
    });

    if (cartItems.length === 0) {
      Alert.alert('Carrito vacío', 'Agrega algunos elementos a tu pedido.');
      return;
    }

    try {
      const existingCart = await AsyncStorage.getItem('cart');
      const cart = existingCart ? JSON.parse(existingCart) : [];
      const updatedCart = [...cart, ...cartItems];
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      Alert.alert(
        'Agregado al carrito',
        'Tu pedido ha sido agregado al carrito.',
        [{ text: 'Aceptar' }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar al carrito.');
    }
  };

  const renderFoodItem = ({ item }) => (
    <FoodCard
      food={item}
      quantity={foodQuantities[item.id]}
      onIncrease={() => increaseQuantity(item.id, 'food')}
      onDecrease={() => decreaseQuantity(item.id, 'food')}
    />
  );

  const renderDrinkItem = ({ item }) => (
    <DrinkCard
      drink={item}
      quantity={drinkQuantities[item.id]}
      onIncrease={() => increaseQuantity(item.id, 'drink')}
      onDecrease={() => decreaseQuantity(item.id, 'drink')}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <Header title="Selecciona tu comida" />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'foods' && styles.activeTab]}
          onPress={() => setActiveTab('foods')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'foods' && styles.activeTabText,
            ]}
          >
            Comidas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'drinks' && styles.activeTab]}
          onPress={() => setActiveTab('drinks')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'drinks' && styles.activeTabText,
            ]}
          >
            Bebidas
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'foods' ? foods : drinks}
        renderItem={activeTab === 'foods' ? renderFoodItem : renderDrinkItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>${calculateTotal()}</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={addToCart}>
          <Text style={styles.addButtonText}>🛒 Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: COLORS.green,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: COLORS.green,
  },
  listContent: {
    padding: 16,
  },
  footer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  addButton: {
    backgroundColor: COLORS.red,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});