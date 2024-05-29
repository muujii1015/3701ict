import React, { useEffect, useCallback } from "react";
import { View, Text, FlatList, Button, StyleSheet, Image, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, increaseQuantity, decreaseQuantity, clearCart, fetchCart, updateCart } from "../redux/cartSlice";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { selectAuth } from '../redux/authSlice';
import { createOrder } from '../redux/orderSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Basket = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice.toFixed(2));
  const isAuthenticated = useSelector(selectAuth);

  useFocusEffect(
    useCallback(() => {
      if (!isAuthenticated) {
        Alert.alert(
          "Restricted Access",
          "You must be signed in to access the shopping cart.",
          [{ text: "Sign In", onPress: () => navigation.navigate("SignIn") }]
        );
        return; 
      } else {
        const fetchUserCart = async () => {
          const userId = await AsyncStorage.getItem('userId');
          if (userId) {
            dispatch(fetchCart(userId));
          }
        };
        fetchUserCart();
      }
    }, [isAuthenticated, navigation])
  );

  useEffect(() => {
    const updateUserCart = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        dispatch(updateCart({ userId, cart: { items: cartItems } }));
      }
    };

    if (cartItems.length > 0) {
      updateUserCart();
    }
  }, [cartItems, dispatch]);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleCheckout = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const orderItems = cartItems.map(item => ({
        prodID: item.id,
        price: item.price,
        quantity: item.quantity,
      }));
      const actionResult = await dispatch(createOrder({ userId, items: orderItems }));
      if (createOrder.fulfilled.match(actionResult)) {
        dispatch(clearCart());
        Alert.alert("Order Created", "A new order has been created. Thank you for your purchase!", [{ text: "OK" }]);
      } else {
        throw new Error(actionResult.error.message || "Failed to create order");
      }
    } catch (error) {
      console.error('Checkout error:', error);
      Alert.alert("Order Failed", error.message || "Failed to create order");
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: item.image }} style={styles.cartItemImage} />
        <View style={styles.b}>
          <Text style={styles.cartItemText}>{item.title}</Text>
          <Text>Price: ${item.price.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.cartItemActions}>
        <Button title="-" onPress={() => handleDecreaseQuantity(item.id)} style={styles.button} />
        <Text>{item.quantity}</Text>
        <Button title="+" onPress={() => handleIncreaseQuantity(item.id)} style={styles.button} />
        <Button title="Remove" onPress={() => handleRemoveItem(item.id)} style={styles.button} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Shopping Cart</Text>
      </View>
      {cartItems.length === 0 ? (
        <Text style={styles.emptytext}>Your Cart is Empty</Text>
      ) : (
        <>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total Items: {totalItems}</Text>
            <Text style={styles.totalText}>Total Price: ${totalPrice}</Text>
          </View>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <Button title="Check Out" onPress={handleCheckout} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  cartItem: {
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: 350,
  },
  cartItemText: {
    fontSize: 18,
  },
  cartItemImage: {
    width: 100,
    height: 100,
    marginLeft: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
  },
  cartItemActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 150,
  },
  button: {
    marginHorizontal: 5,
  },
  totalContainer: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  titleContainer: {
    marginTop: 50,
    alignItems: "center",
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  b: {
    width: 200,
    marginLeft: 10,
  },
  emptytext: {
    marginTop: 200,
  },
});

export default Basket;
