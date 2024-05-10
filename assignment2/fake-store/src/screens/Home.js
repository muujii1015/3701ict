import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import { loadProductData, selectProduct } from "../redux/productSlice";
import { fetchCategories, fetchProductsByCategory } from "../service/apiService";
import { styles } from '../style/style'; 
const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector(selectProduct);
  const navigation = useNavigation(); 

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadInitialData();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
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
