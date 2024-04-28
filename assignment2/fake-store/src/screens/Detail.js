import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';

const Detail = ({ navigation, route }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct(productId);
    }, [productId]);

    const fetchProduct = (productId) => {
        setLoading(true);
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => console.error('Error fetching product:', error));
    };

    const addToCart = () => {
        console.log('Product added to cart:', product);
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Loading Product Details...</Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text style={styles.sectionTitle}>Product Description</Text>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.productTitle}>{product.title}</Text>
                    </View>
                    <View style={styles.sectionContainer}>
                        <View style={styles.borderContainer}>
                            <Image source={{ uri: product.image }} style={styles.productImage} />
                        </View>
                    </View>
                    <View style={styles.detailsContainer}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.detailText}>Rate: {product.rating.rate}</Text>
                            <Text style={styles.detailText}>Sold: {product.rating.count}</Text>
                            <Text style={styles.detailText}>Price: ${product.price}</Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.button, styles.goBackButton]}>
                                <Text style={styles.buttonText}>Go Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={addToCart} style={[styles.button, styles.addToCartButton]}>
                                <Text style={styles.buttonText}>Add to Cart</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <View style={styles.borderContainer}>
                            <ScrollView contentContainerStyle={styles.scrollContainer}>
                                <Text style={styles.productDescription}>{product.description}</Text>
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    scrollView: {
        flexGrow: 1,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    sectionContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        margin: 20,
        color: '#000000',
    },
    borderContainer: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
    },
    productImage: {
        width: 300,
        height: 300,
        resizeMode: 'cover',
        borderRadius: 5,
        marginVertical: 20,
    },
    detailsContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    detailText: {
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    goBackButton: {
        backgroundColor: 'blue',
    },
    addToCartButton: {
        backgroundColor: 'blue',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 10,
    },
    productDescription: {
        fontSize: 16,
    },
});

export default Detail;
