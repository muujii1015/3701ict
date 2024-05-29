// UserProfileScreen.js
import React, { useState, useEffect } from 'react';
import { Alert, TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserProfile } from '../service/apiService';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/authSlice';

const UserProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

const dispatch = useDispatch();

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        } else {
          Alert.alert('Error', 'No user data found');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      }
      setLoading(false);
    };
    loadUserData();
  }, []);

  const updateProfile = async () => {
    setLoading(true);
    try {
      const updates = {
        name: newName || user.name,
        password: newPassword || user.password
      };
      const updatedUser = await updateUserProfile(updates);
      Alert.alert('Success', 'Name and password have been successfully updated');
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('user');
    dispatch(signOut());
    navigation.navigate('SignIn');
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Text>No user data available</Text>;
  }

  return (
    <View style={styles.container}>
      {!isEditing ? (
        <>
          <Text style={styles.label}>Name: {user.name}</Text>
          <Text style={styles.label}>Email: {user.email}</Text>
          <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={signOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="New Name"
            value={newName}
            onChangeText={setNewName}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={updateProfile}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setIsEditing(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      )}
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
    label: {
        fontSize: 18,
        marginBottom: 10,


        borderColor: '#ccc',
        borderWidth: 3,

        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,

        height: 40,

        width: '100%',},
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
    // Add the following style for improved border
    inputContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
});

export default UserProfileScreen;
