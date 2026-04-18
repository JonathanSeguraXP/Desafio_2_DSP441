import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const COLORS = {
  green: '#006341',
  red: '#CE1126',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
};

const FOOD_DETAILS = {
  1: {
    name: 'Tacos de Carne',
    price: 45,
    emoji: '🌮',
    ingredients: 'Carne asada, tortilla de maíz, cebolla, cilantro, limón',
    allergens: 'Gluten, cerdo',
    preparationTime: '10-15 min',
    description: 'Tacos tradicionales con carne asada recién preparada.'
  },
  2: {
    name: 'Burrito Grande',
    price: 65,
    emoji: '🌯',
    ingredients: 'Carne, frijoles, arroz, queso, crema',
    allergens: 'Gluten, lácteos',
    preparationTime: '15-20 min',
    description: 'Burrito extenso con todos los ingredientes.'
  },
  3: {
    name: 'Enchiladas Verdes',
    price: 70,
    emoji: '🫔',
    ingredients: 'Pollo, tortilla, salsa verde, crema, queso',
    allergens: 'Gluten, lácteos',
    preparationTime: '20-25 min',
    description: 'Enchiladas suaves en salsa verde tradicional.'
  },
  4: {
    name: 'Quesadillas',
    price: 40,
    emoji: '🧀',
    ingredients: 'Queso, champiñones, tortilla de harina',
    allergens: 'Gluten, lácteos',
    preparationTime: '10 min',
    description: 'Quesadillas crujientes con queso fundido.'
  },
  5: {
    name: 'Tamales',
    price: 35,
    emoji: '🥟',
    ingredients: 'Masa de maíz, pollo/cerdo, salsa',
    allergens: 'Maíz',
    preparationTime: '15-20 min',
    description: 'Tamales caseros hechos a mano.'
  },
};

const DRINK_DETAILS = {
  101: {
    name: 'Horchata',
    price: 25,
    emoji: '🥛',
    ingredients: 'Arroz, vainilla, canela, leche',
    allergens: 'Lácteos',
    preparationTime: '5 min',
    description: 'Bebida tradicional de rice con especias.'
  },
  102: {
    name: 'Jamaica',
    price: 20,
    emoji: '🩸',
    ingredients: 'Flores de jamaica, azúcar',
    allergens: 'Ninguno',
    preparationTime: '5 min',
    description: 'Refrescante bebida de flores de jamaica.'
  },
};

export default function ProductDetailScreen({ route, navigation }) {
  const { item, type } = route.params;
  const details = type === 'food' ? FOOD_DETAILS[item.id] : DRINK_DETAILS[item.id] || {
    name: item.name,
    price: item.price,
    emoji: '🍽️',
    ingredients: 'Consultar en tienda',
    allergens: 'Consultar',
    preparationTime: '10 min',
    description: item.description
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{details.emoji}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>{details.name}</Text>
          <Text style={styles.description}>{details.description}</Text>
          <Text style={styles.price}>${details.price}</Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>📋 Ingredientes</Text>
            <Text style={styles.infoText}>{details.ingredients}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>⚠️ Alérgenos</Text>
            <Text style={styles.infoText}>{details.allergens}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>⏱️ Tiempo de preparación</Text>
            <Text style={styles.infoText}>{details.preparationTime}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  emojiContainer: {
    backgroundColor: COLORS.white,
    padding: 40,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 100,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    marginBottom: 15,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.green,
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
});