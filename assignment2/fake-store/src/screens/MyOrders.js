import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { selectAuth } from '../redux/authSlice';
import { loadOrders, changeOrderStatus } from '../redux/orderSlice';

const MyOrdersScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const orders = useSelector((state) => state.orders.orders);
  const isAuthenticated = useSelector(selectAuth);
  const [expandedSections, setExpandedSections] = useState({
    new: false,
    paid: false,
    delivered: false,
  });

  useFocusEffect(
    useCallback(() => {
      if (!isAuthenticated) {
        Alert.alert(
          "Restricted Access",
          "You must be signed in to access the My Orders screen.",
          [{ text: "Sign In", onPress: () => navigation.navigate("SignIn") }]
        );
        return;
      }
      dispatch(loadOrders());
    }, [isAuthenticated, navigation])
  );

  const toggleSection = (section) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleStatusChange = async (order, newStatus) => {
    try {
      const updatedOrder = { ...order, ...newStatus };
      await dispatch(changeOrderStatus(updatedOrder));
      Alert.alert("Success", `Your order is now ${newStatus.isPaid ? "paid" : "delivered"}`);
      dispatch(loadOrders());
    } catch (error) {
      Alert.alert("Error", "Failed to update order status");
    }
  };

  const renderOrder = ({ item }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <View style={styles.orderContainer}>
        <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.orderHeader}>
          <Text>Order ID: {item.id}</Text>
          <Text>Items: {item.item_numbers}</Text>
          <Text>Total Price: ${item.total_price.toFixed(2)}</Text>
          <Text style={styles.caret}>{expanded ? "▼" : "▶"}</Text>
        </TouchableOpacity>
        {expanded && (
          <View>
            {JSON.parse(item.order_items).map((product, index) => (
              <View key={index} style={styles.orderItem}>
                <Text>{product.prodID}</Text>
                <Text>Price: ${product.price.toFixed(2)}</Text>
                <Text>Quantity: {product.quantity}</Text>
              </View>
            ))}
            {item.is_paid === 0 && (
              <Button title="Pay" onPress={() => handleStatusChange(item, { isPaid: 1 })} />
            )}
            {item.is_paid === 1 && item.is_delivered === 0 && (
              <Button title="Receive" onPress={() => handleStatusChange(item, { isDelivered: 1 })} />
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      {["new", "paid", "delivered"].map((status, index) => (
        <View key={index}>
          <TouchableOpacity onPress={() => toggleSection(status)} style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {status.charAt(0).toUpperCase() + status.slice(1)} Orders (
              {orders.filter(order => status === "new" ? order.is_paid === 0 : status === "paid" ? order.is_paid === 1 && order.is_delivered === 0 : order.is_delivered === 1).length})
            </Text>
            <Text style={styles.caret}>{expandedSections[status] ? "▼" : "▶"}</Text>
          </TouchableOpacity>
          {expandedSections[status] && (
            <FlatList
              data={orders.filter(order => status === "new" ? order.is_paid === 0 : status === "paid" ? order.is_paid === 1 && order.is_delivered === 0 : order.is_delivered === 1)}
              renderItem={renderOrder}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionHeader: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    color: "#fff",
  },
  caret: {
    fontSize: 18,
    color: "#fff",
  },
  orderContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
});

export default MyOrdersScreen;
