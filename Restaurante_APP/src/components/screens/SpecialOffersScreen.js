import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const COLORS = {
  green: '#006341',
  red: '#CE1126',
  white: '#FFFFFF',
  gold: '#D4AF37',
  lightGray: '#F5F5F5',
};

const OFFERS = [
  {
    id: 1,
    title: '🌮 Combo Taco Fiesta',
    description: '5 tacos de diferentes carnes + 2 aguas frescas',
    originalPrice: 150,
    offerPrice: 99,
    emoji: '🌮',
    validUntil: '31/Dic/2026',
    badge: '30% DCTO'
  },
  {
    id: 2,
    title: '🌯 Burrito Doble',
    description: '2 burritos grandes + patatas + refresco',
    originalPrice: 130,
    offerPrice: 99,
    emoji: '🌯',
    validUntil: '31/Dic/2026',
    badge: '25% DCTO'
  },
  {
    id: 3,
    title: '🍽️ Familia Complete',
    description: 'Enchiladas para 4 personas + pozole + aguas',
    originalPrice: 450,
    offerPrice: 349,
    emoji: '🍽️',
    validUntil: '31/Dic/2026',
    badge: 'BEST SELLER'
  },
  {
    id: 4,
    title: '🥤 Free Refresco',
    description: 'Cualquier comida principal + refresco gratis',
    originalPrice: 50,
    offerPrice: 0,
    emoji: '🥤',
    validUntil: '31/Dic/2026',
    badge: 'GRATIS'
  },
  {
    id: 5,
    title: '🌮 Martes de Tacos',
    description: '6 tacos por el precio de 3',
    originalPrice: 90,
    offerPrice: 45,
    emoji: '🌮',
    validUntil: 'Todos los martes',
    badge: '50% DCTO'
  },
];

export default function SpecialOffersScreen({ navigation }) {
  const renderOffer = ({ item }) => (
    <View style={styles.offerCard}>
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.offerContent}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
        <Text style={styles.offerTitle}>{item.title}</Text>
        <Text style={styles.offerDescription}>{item.description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>${item.originalPrice}</Text>
          <Text style={styles.offerPrice}>
            {item.offerPrice === 0 ? 'GRATIS' : `$${item.offerPrice}`}
          </Text>
        </View>
        <Text style={styles.validUntil}>Válido hasta: {item.validUntil}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔥 Ofertas Especiales</Text>
        <Text style={styles.headerSubtitle}>Promociones del día</Text>
      </View>

      <FlatList
        data={OFFERS}
        renderItem={renderOffer}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          * Las ofertas no son acumulables con otras promociones
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  header: {
    backgroundColor: COLORS.red,
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
    marginTop: 5,
  },
  listContent: {
    padding: 16,
  },
  offerCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emojiContainer: {
    width: 100,
    backgroundColor: '#FFF5E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 50,
  },
  offerContent: {
    flex: 1,
    padding: 15,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.red,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 5,
  },
  offerDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  offerPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  validUntil: {
    fontSize: 11,
    color: '#999',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
  },
});