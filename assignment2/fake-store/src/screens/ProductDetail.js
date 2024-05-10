import React from "react";
import { View, Text, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import { productDetailStyles } from '../style/style2'

const ProductDetail = ({ route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const handleAddToCart = () => {
    dispatch(addItem(product));
    
  };

  return (
    <View style={productDetailStyles.container}>
      <View style={productDetailStyles.titleContainer}>
        <Text style={productDetailStyles.title}>Product Details:</Text>
      </View>
      <View style={productDetailStyles.categoriesContainer}>
        <Text style={[productDetailStyles.text, productDetailStyles.bold]}>{product.title}</Text>
        <Image
          source={{ uri: product.image }} 
          style={[productDetailStyles.itemImage, productDetailStyles.productImage, { borderColor: 'blue' }]} // Change border color to blue
        />

        <View style={productDetailStyles.rowContainer}>
          <View style={productDetailStyles.priceCountRateContainer}>
            <Text style={[productDetailStyles.text, productDetailStyles.bold]}>Price:</Text>
            <Text style={[productDetailStyles.text, productDetailStyles.textDetail]}>${product.price}</Text>
          </View>
          <View style={productDetailStyles.priceCountRateContainer}>
            <Text style={[productDetailStyles.text, productDetailStyles.bold]}>Rate:</Text>
            <Text style={[productDetailStyles.text, productDetailStyles.textDetail]}>{product.rating.rate}</Text>
          </View>
          <View style={productDetailStyles.priceCountRateContainer}>
            <Text style={[productDetailStyles.text, productDetailStyles.bold]}>Sold:</Text>
            <Text style={[productDetailStyles.text, productDetailStyles.textDetail]}>{product.rating.count}</Text>
          </View>
        </View>

        <View style={productDetailStyles.rowContainer}>
        <TouchableOpacity style={productDetailStyles.goBackButton} onPress={goBack}>
          <Text style={productDetailStyles.goBackButtonText}>Go Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={productDetailStyles.goBackButton} onPress={handleAddToCart}>
          <Text style={productDetailStyles.goBackButtonText}>Add to Cart</Text>
        </TouchableOpacity>

        </View>
        
        
        <Text style={[productDetailStyles.text, productDetailStyles.bold]}>Description: </Text>
        <ScrollView style={productDetailStyles.scrollContainer}>
          <Text style={[productDetailStyles.text, productDetailStyles.textDetail, productDetailStyles.scrollDescription]}>{product.description}</Text>
        </ScrollView>
       
      </View>
    </View>
  );
};

export default ProductDetail;
