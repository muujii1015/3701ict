import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native"; 
import { fetchCategories } from "../service/apiService";
import { styles } from '../style/style'; 
import { selectAuth } from '../redux/authSlice';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isAuthenticated = useSelector(selectAuth);

  useFocusEffect(
    useCallback(() => {
      if (!isAuthenticated) {
        Alert.alert(
          "Restricted Access",
          "You must be signed in to access this page.",
          [
           
            { text: "Sign In", onPress: () => navigation.navigate("Profile") }
          ]
        );
        return; 
      }

      const loadInitialData = async () => {
        try {
          const categoriesData = await fetchCategories();
          setCategories(categoriesData);
        } catch (error) {
          console.error("Failed to load categories:", error.message);
          Alert.alert("Error", "Failed to fetch categories.");
        }
      };

      loadInitialData();
    }, [isAuthenticated, navigation])
  );

  const handleCategorySelect = (category) => {
    navigation.navigate("ListScreen", { category });
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Categories:</Text>
      </View>
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryButton}
            onPress={() => handleCategorySelect(category)}
          >
            <Text style={styles.categoryButtonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Home;
