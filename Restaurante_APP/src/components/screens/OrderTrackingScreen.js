import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLORS = {
  green: '#006341',
  red: '#CE1126',
  white: '#FFFFFF',
  gold: '#D4AF37',
  lightGray: '#F5F5F5',
};

const STEPS = [
  { key: 'Pendiente', label: 'Pedido Recibido', emoji: '📝', description: 'Tu pedido ha sido confirmado' },
  { key: 'Preparando', label: 'En Preparación', emoji: '👨‍🍳', description: 'Estamos preparando tu comida' },
  { key: 'Enviado', label: 'En Camino', emoji: '🚚', description: 'Tu pedido está en camino' },
  { key: 'Entregado', label: 'Entregado', emoji: '✅', description: 'Disfruta tu comida' },
];

export default function OrderTrackingScreen({ route }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectedOrderId = route.params?.orderId;

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const savedOrders = await AsyncStorage.getItem('orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStep = (status) => {
    const index = STEPS.findIndex(s => s.key === status);
    return index >= 0 ? index : 0;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.green} />
      </SafeAreaView>
    );
  }

  const activeOrders = orders.filter(o => o.status !== 'Entregado');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Estado del Pedido</Text>
      </View>

      {activeOrders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>📭 No hay pedidos activos</Text>
          <Text style={styles.emptySubtext}>Haz un nuevo pedido para seguirlo aquí</Text>
        </View>
      ) : (
        activeOrders.map((order) => {
          const currentStep = getCurrentStep(order.status);
          return (
            <View key={order.id} style={styles.orderCard}>
              <Text style={styles.orderId}>Pedido #{order.id}</Text>
              <Text style={styles.orderDate}>
                {new Date(order.date).toLocaleDateString('es-MX')}
              </Text>
              
              <View style={styles.stepsContainer}>
                {STEPS.map((step, index) => (
                  <View key={step.key} style={styles.stepRow}>
                    <View style={[
                      styles.stepCircle,
                      index <= currentStep && styles.stepActive
                    ]}>
                      <Text style={styles.stepEmoji}>{step.emoji}</Text>
                    </View>
                    <View style={styles.stepInfo}>
                      <Text style={[
                        styles.stepLabel,
                        index <= currentStep && styles.stepLabelActive
                      ]}>
                        {step.label}
                      </Text>
                      <Text style={styles.stepDescription}>
                        {step.description}
                      </Text>
                    </View>
                    {index < STEPS.length - 1 && (
                      <View style={[
                        styles.connector,
                        index < currentStep && styles.connectorActive
                      ]} />
                    )}
                  </View>
                ))}
              </View>

              <View style={styles.orderItems}>
                <Text style={styles.itemsTitle}>Tu orden:</Text>
                {order.items.map((item, idx) => (
                  <Text key={idx} style={styles.itemText}>
                    {item.quantity}x {item.name}
                  </Text>
                ))}
              </View>

              <Text style={styles.total}>Total: ${order.total}</Text>
            </View>
          );
        })
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  header: {
    backgroundColor: COLORS.green,
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  orderCard: {
    backgroundColor: COLORS.white,
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  orderDate: {
    fontSize: 14,
    color: '#999',
    marginBottom: 15,
  },
  stepsContainer: {
    marginBottom: 15,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  stepCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepActive: {
    backgroundColor: COLORS.green,
  },
  stepEmoji: {
    fontSize: 24,
  },
  stepInfo: {
    flex: 1,
    marginLeft: 12,
  },
  stepLabel: {
    fontSize: 16,
    color: '#999',
  },
  stepLabelActive: {
    color: '#1A1A1A',
    fontWeight: 'bold',
  },
  stepDescription: {
    fontSize: 12,
    color: '#999',
  },
  connector: {
    position: 'absolute',
    left: 24,
    top: 50,
    width: 2,
    height: 20,
    backgroundColor: '#E0E0E0',
  },
  connectorActive: {
    backgroundColor: COLORS.green,
  },
  orderItems: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
    marginBottom: 12,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  itemText: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.green,
    textAlign: 'right',
  },
});