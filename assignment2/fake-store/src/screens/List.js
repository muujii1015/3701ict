import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Button,
    Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loadProductData, selectProduct } from "../redux/productSlice";
import { fetchProductsByCategory } from "../service/apiService";
import { styles } from '../style/style'; 

const List = ({ route }) => {
  const { category } = route.params;
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, error } = useSelector(selectProduct);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductsByCategory(category);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, [category]);

  const handleProductSelect = (product) => {
    navigation.navigate("ProductDetail", { product });
  };

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryButton, { alignSelf: 'center' }]} onPress={() => handleProductSelect(item)}
    >
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: item.image }} 
          style={styles.itemImage}
        />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, styles.listItem]}>
        <Text style={styles.title}>Products in {category} category:</Text>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={[styles.products, styles.listItem]}
        />
      )}
      <TouchableOpacity style={[styles.goBackButton, { alignSelf: 'center' }]} onPress={goBack}>
        <Text style={styles.goBackButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default List;
