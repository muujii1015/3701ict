import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export const ImgButton = ({ name, label, navToDo }) => {
  return (
    <Pressable onPress={navToDo}>
      <View style={styles.container}>
        <Ionicons name={name} color="white" size={20} />
        <Text style={styles.text}>{label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150, 
    height: 50, 
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center", 
  },
  text: {
    color: "white",
  },
});
