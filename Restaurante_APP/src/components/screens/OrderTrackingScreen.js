import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Animated, TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './context/AuthContext';

const COLORS = {
  green: '#006341',
  red: '#CE1126',
  white: '#FFFFFF',
  gold: '#D4AF37',
  lightGray: '#F5F5F5',
  purple: '#9B59B6',
};

const STEPS = [
  { key: 'Pendiente', label: 'Pedido Recibido', emoji: '📝', description: 'Tu pedido ha sido confirmado' },
  { key: 'Preparando', label: 'En Preparación', emoji: '👨‍🍳', description: 'Estamos preparando tu comida' },
  { key: 'Enviado', label: 'En Camino', emoji: '🚚', description: 'Tu pedido está en camino' },
  { key: 'Entregado', label: 'Entregado', emoji: '✅', description: '¡Disfruta tu comida!' },
];

const NEXT_STATUS = {
  'Pendiente': 'Preparando',
  'Preparando': 'Enviado',
  'Enviado': 'Entregado',
};

export default function OrderTrackingScreen({ route }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [animatedValues] = useState(STEPS.map(() => new Animated.Value(0)));
  const intervalRef = useRef(null);
  const selectedOrderId = route.params?.orderId;
  const AUTO_REFRESH_INTERVAL = 10000; // 10 segundos

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setLastRefresh(new Date().toLocaleTimeString());
    setRefreshing(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    if (user?.role === 'cliente') {
      intervalRef.current = setInterval(() => {
        loadOrders();
      }, AUTO_REFRESH_INTERVAL);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [user?.role]);

  useEffect(() => {
    if (orders.length > 0) {
      const currentStep = getCurrentStep(orders[0].status);
      animateProgress(currentStep);
    }
  }, [orders]);

  const animateProgress = (stepIndex) => {
    Animated.sequence(
      STEPS.map((_, index) => 
        Animated.timing(animatedValues[index], {
          toValue: index <= stepIndex ? 1 : 0,
          duration: 500,
          useNativeDriver: false
        })
      )
    ).start();
  };

  const loadOrders = async () => {
    try {
      const savedOrders = await AsyncStorage.getItem('orders');
      if (savedOrders) {
        let allOrders = JSON.parse(savedOrders);
        if (user?.role === 'cliente') {
          allOrders = allOrders.filter(o => o.username === user?.username);
        }
        setOrders(allOrders);
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

  const getStatusTime = (status) => {
    const times = {
      'Pendiente': '2-5 min',
      'Preparando': '10-15 min',
      'Enviado': '5-10 min',
      'Entregado': 'Listo'
    };
    return times[status] || '-';
  };

  const simulateStatusChange = async (orderId) => {
    const allOrdersKey = 'orders';
    try {
      const savedOrders = await AsyncStorage.getItem(allOrdersKey);
      if (savedOrders) {
        let allOrders = JSON.parse(savedOrders);
        const orderIndex = allOrders.findIndex(o => o.id === orderId);
        if (orderIndex >= 0 && NEXT_STATUS[allOrders[orderIndex].status]) {
          allOrders[orderIndex].status = NEXT_STATUS[allOrders[orderIndex].status];
          await AsyncStorage.setItem(allOrdersKey, JSON.stringify(allOrders));
          loadOrders();
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.green} />
      </SafeAreaView>
    );
  }

  const activeOrders = orders.filter(o => o.status !== 'Entregado');

  const isManager = user?.role === 'admin' || user?.role === 'cocina';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>🚚 Estado del Pedido</Text>
          {user?.role === 'cliente' && (
            <TouchableOpacity onPress={onRefresh}>
              <Text style={styles.refreshButton}>🔄</Text>
            </TouchableOpacity>
          )}
        </View>
        {user?.role === 'cliente' && (
          <Text style={styles.headerSubtitle}>
            Auto-actualizando cada 10s {lastRefresh && `(última: ${lastRefresh})`}
          </Text>
        )}
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
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderId}>Pedido #{order.id}</Text>
                  {isManager && (
                    <Text style={styles.orderUser}>Usuario: {order.username}</Text>
                  )}
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>
              </View>
              
              <Text style={styles.orderDate}>
                {new Date(order.date).toLocaleDateString('es-MX', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
              
              <View style={styles.progressContainer}>
                {STEPS.map((step, index) => {
                  const isActive = index <= currentStep;
                  const progress = animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1]
                  });
                  
                  return (
                    <View key={step.key} style={styles.stepContainer}>
                      <Animated.View style={[
                        styles.stepCircle,
                        isActive ? styles.stepActive : styles.stepInactive,
                        { 
                          transform: [{ scale: isActive ? 1 : 0.9 }]
                        }
                      ]}>
                        <Text style={styles.stepEmoji}>{step.emoji}</Text>
                        {isActive && (
                          <Animated.View style={[
                            styles.pulseDot,
                            { opacity: progress }
                          ]} />
                        )}
                      </Animated.View>
                      
                      <View style={styles.stepInfo}>
                        <Text style={[
                          styles.stepLabel,
                          isActive && styles.stepLabelActive
                        ]}>
                          {step.label}
                        </Text>
                        <Text style={[
                          styles.stepTime,
                          isActive && styles.stepTimeActive
                        ]}>
                          ⏱️ {getStatusTime(step.key)}
                        </Text>
                        {isActive && (
                          <Text style={styles.stepDescription}>
                            {step.description}
                          </Text>
                        )}
                      </View>
                      
                      {index < STEPS.length - 1 && (
                        <View style={[
                          styles.connector,
                          index < currentStep && styles.connectorActive
                        ]}>
                          <Animated.View style={[
                            styles.connectorFill,
                            {
                              height: animatedValues[index].interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '100%']
                              })
                            }
                          ]} />
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>

              <View style={styles.orderItems}>
                <Text style={styles.itemsTitle}>📋 Tu orden:</Text>
                {order.items.map((item, idx) => (
                  <View key={idx} style={styles.itemRow}>
                    <Text style={styles.itemText}>• {item.quantity}x {item.name}</Text>
                    <Text style={styles.itemPrice}>${item.price * item.quantity}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.total}>${order.total}</Text>
              </View>

              {isManager && order.status !== 'Entregado' && (
                <View style={styles.adminButtons}>
                  <Text style={styles.adminTitle}>🔧 Cambiar Estado ({user?.role})</Text>
                  <TouchableOpacity 
                    style={styles.simulateButton}
                    onPress={() => simulateStatusChange(order.id)}
                  >
                    <Text style={styles.simulateButtonText}>
                      ➡️ Siguiente: {NEXT_STATUS[order.status]}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              
              <View style={styles.infoBox}>
                <Text style={styles.infoBoxText}>
                  ℹ️ Usa el código #{order.id} al recibir tu pedido
                </Text>
              </View>
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
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  refreshButton: {
    fontSize: 24,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
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
    borderRadius: 16,
    padding: 16,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  orderUser: {
    fontSize: 12,
    color: '#999',
  },
  statusBadge: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 15,
  },
  stepCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepActive: {
    backgroundColor: COLORS.green,
  },
  stepInactive: {
    backgroundColor: '#E0E0E0',
  },
  stepEmoji: {
    fontSize: 24,
  },
  pulseDot: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.green,
  },
  stepInfo: {
    flex: 1,
    marginLeft: 12,
  },
  stepLabel: {
    fontSize: 14,
    color: '#999',
  },
  stepLabelActive: {
    color: '#1A1A1A',
    fontWeight: 'bold',
  },
  stepTime: {
    fontSize: 11,
    color: '#BBB',
  },
  stepTimeActive: {
    color: COLORS.green,
    fontWeight: 'bold',
  },
  stepDescription: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  connector: {
    position: 'absolute',
    left: 24,
    top: 50,
    width: 2,
    height: 30,
    backgroundColor: '#E0E0E0',
    zIndex: -1,
  },
  connectorActive: {
    backgroundColor: COLORS.green,
  },
  connectorFill: {
    width: '100%',
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
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemText: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  infoBox: {
    backgroundColor: '#FFF5E6',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  infoBoxText: {
    fontSize: 12,
    color: COLORS.gold,
    fontWeight: 'bold',
  },
  adminButtons: {
    backgroundColor: COLORS.purple,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  adminTitle: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  simulateButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  simulateButtonText: {
    color: COLORS.purple,
    fontSize: 14,
    fontWeight: 'bold',
  },
});