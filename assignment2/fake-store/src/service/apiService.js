// apiService.js
const baseUrl = "http://localhost:3000/";

import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchCategories = async () => {
  try {
    const response = await fetch(baseUrl + "products/categories");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching categories: " + error.message);
  }
};

export const fetchProductsByCategory = async (category) => {
  try {
    const url = baseUrl + `products/category/${category}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};

export const authenticateUser = async (email, password) => {
  try {
    const response = await fetch(`${baseUrl}users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.status !== "OK" || !data.token || !data.id) {
      throw new Error(data.message || "Error during authentication");
    }

    await AsyncStorage.setItem('user', JSON.stringify({ id: data.id, email: email, name: data.name }));
    await AsyncStorage.setItem('userToken', data.token);

    return { user: { id: data.id, email: email, name: data.name }, token: data.token };
  } catch (error) {
    throw new Error("Error during authentication: " + error.message);
  }
};

// Updated function to update user profile
export const updateUserProfile = async (updates) => {
  const token = await AsyncStorage.getItem('userToken');
  if (!token) {
    throw new Error("Token not found");
  }

  const response = await fetch(`${baseUrl}users/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Add authentication header
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  // Check the status of the response
  if (data.status !== "OK") {
    throw new Error(data.message || "Error updating profile");
  }

  // Update user data in AsyncStorage
  const updatedUser = { ...JSON.parse(await AsyncStorage.getItem('user')), ...updates };
  await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

  return updatedUser;
};



export const registerUser = async (user) => {
  try {
    console.log("Sending user registration request:", user);
    const response = await fetch(`${baseUrl}users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    // Log the full response for debugging
    console.log("Received response from server:", response);

    const data = await response.json();
    console.log("Response data:", data);

    if (data.status !== "OK") {
      console.error("Error in response data:", data);
      throw new Error(data.message || "Error registering user");
    }

    console.log("User registered successfully:", data);
    return data;
  } catch (error) {
    console.error("Error during user registration:", error.message);
    throw new Error("Error registering user: " + error.message);
  }
};

