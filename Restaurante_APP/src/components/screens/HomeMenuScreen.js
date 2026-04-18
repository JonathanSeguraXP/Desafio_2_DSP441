import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { useAuth } from './context/AuthContext';

const HomeMenuScreen = ({ navigation }) => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar', style: 'destructive', onPress: logout }
      ]
    );
  };

  const menuOptions = [
    {
      title: '🍽️ Ordenar Comida',
      description: 'Selecciona alimentos y bebidas',
      screen: 'FoodSelection',
      color: '#FF9F1C',
      disabled: false
    },
    {
      title: '🛒 Mi Pedido Actual',
      description: 'Ver tu orden actual',
      screen: 'OrderSummary',
      color: '#2EC4B6',
      disabled: false
    },
    {
      title: '🚚 Seguimiento',
      description: 'Seguir estado del pedido',
      screen: 'OrderTracking',
      color: '#9B59B6',
      disabled: false
    },
    {
      title: '📊 Historial',
      description: 'Ver pedidos anteriores',
      screen: 'PurchaseHistory',
      color: '#E71D36',
      disabled: false
    },
    {
      title: '🔥 Ofertas',
      description: 'Promociones del día',
      screen: 'SpecialOffers',
      color: '#CE1126',
      disabled: false
    }
  ];

  const handleNavigation = (screen, disabled) => {
    if (disabled) {
      Alert.alert('Próximamente', '¡Esta función estará disponible pronto!');
      return;
    }
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>¡Bienvenido, {user?.username}!</Text>
        <Text style={styles.subtitle}>¿Qué quieres hacer hoy?</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuCard, 
              { backgroundColor: option.color },
              option.disabled && styles.disabledCard
            ]}
            onPress={() => handleNavigation(option.screen, option.disabled)}
          >
            <Text style={styles.menuTitle}>{option.title}</Text>
            <Text style={styles.menuDescription}>{option.description}</Text>
            {option.disabled && (
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonText}>Próximamente</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6',
  },
  header: {
    padding: 20,
    backgroundColor: '#006341',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFE5D9',
    marginTop: 5,
  },
  menuContainer: {
    padding: 20,
  },
  menuCard: {
    padding: 25,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  disabledCard: {
    opacity: 0.7,
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  menuDescription: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  logoutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#DC2F02',
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  comingSoonBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  comingSoonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HomeMenuScreen;