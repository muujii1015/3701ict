// File: src/screens/SignUp.js
import React, { useState } from 'react';
import { Alert, TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { registerUser } from '../service/apiService';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = async () => {
        console.log("Sign Up button clicked");
        try {
            const data = await registerUser({ name, email, password });
            Alert.alert('Success', 'User registered successfully!');
            navigation.navigate('SignIn');
        } catch (error) {
            console.error("Error during sign up:", error.message);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Sign up a new user</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={() => { setName(''); setEmail(''); setPassword(''); }}>
                <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={signUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.switchText} onPress={() => navigation.navigate('SignIn')}>
                Switch to: sign in
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    titleContainer: {
        marginTop: 50,
        alignItems: 'center',
        backgroundColor: '#2196F3',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        color: '#000',
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#2196F3',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    clearButton: {
        marginBottom: 20,
    },
    clearButtonText: {
        color: '#2196F3',
        textDecorationLine: 'underline',
    },
    switchText: {
        marginTop: 20,
        color: '#2196F3',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});

export default SignUpScreen;