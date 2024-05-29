// File: src/screens/SignIn.js
import React, { useState } from 'react';
import { Alert, TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authenticateUser } from '../service/apiService';
import { useDispatch } from 'react-redux';
import { signIn as sign} from '../redux/authSlice';

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const signIn = async () => {
        console.log("Sign In button clicked");
        try {
            const data = await authenticateUser(email, password);
            console.log("Authentication successful, data received:", data);
            dispatch(sign());
            await AsyncStorage.setItem('userToken', data.token);
            await AsyncStorage.setItem('userId', data.user.id.toString());
            navigation.navigate('UserProfile');
        } catch (error) {
            console.error("Error during sign in:", error.message);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Sign in with your email and password</Text>
            </View>
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
            <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={() => { setEmail(''); setPassword(''); }}>
                <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <Text style={styles.switchText} onPress={() => navigation.navigate('SignUp')}>
                Switch to: sign up
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

export default SignInScreen;
