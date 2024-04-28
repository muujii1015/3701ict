import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const List = ({ navigation, route }) => {
    const { category } = route.params;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (category) {
            fetchProducts(category);
        }
    }, [category]);

    const fetchProducts = (category) => {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => console.error('Error fetching products:', error));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headline}>{category}</Text>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Loading Products...</Text>
                </View>
            ) : (
                <View style={styles.flatListContainer}>
                    <FlatList
                        data={products}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Detail', { productId: item.id })} 
                                style={styles.productItem}
                            >
                                <Image source={{ uri: item.image }} style={styles.productImage} />
                                <View style={styles.productInfo}>
                                    <Text style={styles.productTitle}>{item.title}</Text>
                                    <Text style={styles.productPrice}>Price: ${item.price}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                <Text style={styles.goBackText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    headline: {
        fontSize: 40,
        fontWeight: 'bold',
        margin: 20,
        color: '#000000',
    },
    flatListContainer: {
        flex: 1,
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginVertical: 10,
        padding: 10,
    },
    productItem: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    productImage: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
        flexDirection: 'column',
    },
    productTitle: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 5,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    goBackButton: {
        margin: 20,
        padding: 15,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    goBackText: {
        color: 'white',
        fontSize: 16,
    },
});

export default List;
