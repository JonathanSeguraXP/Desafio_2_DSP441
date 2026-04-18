import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const FOOD_IMAGES = {
  1: '🌮',
  2: '🌯',
  3: '🫔',
  4: '🧀',
  5: '🥟',
  6: '🫓',
  7: '🫑',
  8: '🍲',
  9: '🍗',
  10: '🌯',
};

export default function FoodCard({ food, quantity, onIncrease, onDecrease }) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Text style={styles.emoji}>{FOOD_IMAGES[food.id] || '🍽️'}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{food.name}</Text>
        <Text style={styles.description}>{food.description}</Text>
        <Text style={styles.price}>${food.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.button} onPress={onDecrease}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity style={styles.button} onPress={onIncrease}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 32,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006341',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#CE1126',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 12,
    color: '#1A1A1A',
  },
});