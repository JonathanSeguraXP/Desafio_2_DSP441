import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

const COLORS = {
  green: '#006341',
  red: '#CE1126',
  white: '#FFFFFF',
  gold: '#D4AF37',
  lightGray: '#F5F5F5',
};

const MENU_PRICES = {
  tacos: 55,
  burrito: 75,
  enchiladas: 85,
  pozole: 70,
  horchata: 30,
  jamaica: 25,
};

const OFFERS = [
  {
    id: 1,
    title: '🌮 Combo Taco Fiesta',
    description: '5 tacos + 2 aguas frescas',
    items: '5x🌮 + 2x🥤',
    quantity: '5 personas',
    originalPrice: (MENU_PRICES.tacos * 5) + (MENU_PRICES.horchata * 2),
    offerPrice: 199,
    emoji: '🌮',
    validUntil: '31/Dic/2026',
    badge: '-40%'
  },
  {
    id: 2,
    title: '🌯 Burrito Pareja',
    description: '2 burritos + patatas',
    items: '2x🌯 + 🥔',
    quantity: '2 personas',
    originalPrice: (MENU_PRICES.burrito * 2) + 20,
    offerPrice: 129,
    emoji: '🌯',
    validUntil: '31/Dic/2026',
    badge: '-29%'
  },
  {
    id: 3,
    title: '🍽️ Familia Mexico',
    description: 'Enchiladas + Pozole + 4 aguas',
    items: '4x🫔 + 🍲 + 4x🥤',
    quantity: '4-5 personas',
    originalPrice: (MENU_PRICES.enchiladas * 4) + MENU_PRICES.pozole + (MENU_PRICES.jamaica * 4),
    offerPrice: 399,
    emoji: '🍽️',
    validUntil: '31/Dic/2026',
    badge: 'FAVORITE'
  },
  {
    id: 4,
    title: '🥤 Refresco Gratis',
    description: 'Con cualquier comida',
    items: '1x🥤',
    quantity: '1 persona',
    originalPrice: MENU_PRICES.jamaica,
    offerPrice: 0,
    emoji: '🥤',
    validUntil: '31/Dic/2026',
    badge: 'FREE'
  },
  {
    id: 5,
    title: '🌮 Martes de Tacos',
    description: '6 tacos (el 3er taco gratis)',
    items: '6x🌮',
    quantity: '2-3 personas',
    originalPrice: MENU_PRICES.tacos * 6,
    offerPrice: 149,
    emoji: '🌮',
    validUntil: 'Todos los martes',
    badge: '-55%'
  },
];

export default function SpecialOffersScreen() {
  const renderOffer = ({ item }) => {
    const discount = Math.round((1 - item.offerPrice / item.originalPrice) * 100);
    
    return (
      <View style={styles.offerCard}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{item.emoji}</Text>
        </View>
        
        <View style={styles.offerContent}>
          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: item.badge === 'FREE' ? COLORS.green : COLORS.red }]}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
            <Text style={styles.itemsText}>{item.items}</Text>
          </View>
          
          <Text style={styles.offerTitle}>{item.title}</Text>
          <Text style={styles.offerDescription}>{item.description}</Text>
          <Text style={styles.quantityText}>Para {item.quantity}</Text>
          
          <View style={styles.priceContainer}>
            <View style={styles.priceRow}>
              <Text style={styles.originalPrice}>${item.originalPrice}</Text>
              <Text style={styles.discountText}>-{discount}%</Text>
            </View>
            <Text style={styles.offerPrice}>
              {item.offerPrice === 0 ? 'GRATIS' : `$${item.offerPrice}`}
            </Text>
          </View>
          
          <Text style={styles.validUntil}>Válido hasta: {item.validUntil}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔥 Ofertas Especiales</Text>
        <Text style={styles.headerSubtitle}>Precios basados en menú actual</Text>
      </View>

      <FlatList
        data={OFFERS}
        renderItem={renderOffer}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          * Precios calculados con precios actuales del menú
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
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.9,
    marginTop: 4,
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
    width: 90,
    backgroundColor: '#FFF5E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 45,
  },
  offerContent: {
    flex: 1,
    padding: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 8,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: 'bold',
  },
  itemsText: {
    fontSize: 10,
    color: '#999',
  },
  offerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  offerDescription: {
    fontSize: 12,
    color: '#666',
  },
  quantityText: {
    fontSize: 11,
    color: '#999',
    marginBottom: 6,
  },
  priceContainer: {
    marginTop: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 13,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountText: {
    fontSize: 11,
    color: COLORS.red,
    fontWeight: 'bold',
  },
  offerPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  validUntil: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  footerText: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
  },
});