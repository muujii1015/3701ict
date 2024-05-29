// File: src/screens/MyOrders.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders, changeOrderStatus, selectOrders, selectOrdersLoading } from '../redux/orderSlice';
import { styles } from '../style/style';

const MyOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectOrdersLoading);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    dispatch(loadOrders());
  }, [dispatch]);

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await dispatch(changeOrderStatus({ orderId, status: newStatus })).unwrap();
      Alert.alert('Success', `Your order is ${newStatus}`);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const renderOrder = (order) => {
    const isExpanded = expandedOrderId === order.id;
    return (
      <View key={order.id} style={styles.orderContainer}>
        <TouchableOpacity onPress={() => toggleOrderExpansion(order.id)}>
          <Text>Order ID: {order.id}</Text>
          <Text>Items: {order.items.length}</Text>
          <Text>Total: ${order.total.toFixed(2)}</Text>
          <Text>{isExpanded ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {isExpanded && (
          <View>
            {order.items.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <Text>{item.title} - Quantity: {item.quantity}</Text>
              </View>
            ))}
            {order.status === 'new' && (
              <TouchableOpacity onPress={() => handleStatusChange(order.id, 'paid')} style={styles.button}>
                <Text style={styles.buttonText}>Pay</Text>
              </TouchableOpacity>
            )}
            {order.status === 'paid' && (
              <TouchableOpacity onPress={() => handleStatusChange(order.id, 'delivered')} style={styles.button}>
                <Text style={styles.buttonText}>Receive</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      {orders.map(renderOrder)}
    </View>
  );
};

export default MyOrders;
