import React from "react";
import { View, Text, FlatList, Button, StyleSheet, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";

const Basket = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice.toFixed(2)); // Format total price

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
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
      marginRight:150,
    },
    button: {
      marginHorizontal: 5, // Adjust button margin
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
      alignItems: 'center',
      backgroundColor: '#2196F3', // Blue background
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      color: '#fff', // White color for text
      fontWeight: 'bold',
    }, 
    b:{
        width: 200,
        marginLeft: 10,
    }, emptytext:{
        marginTop: 200,
    }
  });

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: item.image }} style={styles.cartItemImage} />
        <View style ={styles.b}>
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
      {cartItems.length === 0 ? (
        <View style={{ flexDirection: "column", alignItems: "center" }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Shopping Cart</Text>
        </View>

        <Text style={styles.emptytext}>No items in cart</Text>
      </View>

      ) : (
        <View >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Shopping Cart</Text>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total Items: {totalItems}</Text>
            <Text style={styles.totalText}>Total Price: ${totalPrice}</Text>
          </View>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
};

export default Basket;
