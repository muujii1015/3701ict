import React, { useEffect } from "react";
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import store from "./src/redux/store";
import Home from "./src/screens/Home";
import ListScreen from "./src/screens/List";
import ProductDetail from "./src/screens/ProductDetail";
import Basket from "./src/screens/Basket";
import UserProfileScreen from "./src/screens/UserProfile";
import SignInScreen from "./src/screens/SignIn";
import SignUpScreen from "./src/screens/SignUp";
import MyOrders from "./src/screens/MyOrders";
import { View } from "react-native";
import { Badge } from 'react-native-elements';
import { totalItemsSelector } from "./src/redux/cartSlice";
import { selectAuth } from './src/redux/authSlice';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ({ navigation }) => {
  const isAuthenticated = useSelector(selectAuth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Profile');
    }
  }, [isAuthenticated, navigation]);

  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="ListScreen" component={ListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
  
};

const BasketWithNav = ({ navigation }) => {
  const isAuthenticated = useSelector(selectAuth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Profile');
    }
  }, [isAuthenticated, navigation]);

  return <Basket />;
};

const MyOrdersWithNav = ({ navigation }) => {
  const isAuthenticated = useSelector(selectAuth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Profile');
    }
  }, [isAuthenticated, navigation]);

  return <MyOrders />;
};

const UserStack = () => {
  const isAuthenticated = useSelector(selectAuth);
  
  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? "UserProfile" : "SignIn"}>
      {isAuthenticated ? (
        <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              const num = useSelector(totalItemsSelector); 
              const isAuthenticated = useSelector(selectAuth);
              

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Basket") {
                iconName = focused ? "basket" : "basket-outline";
              } else if (route.name === "Profile") {
                iconName = focused ? "person" : "person-outline";
              } else if (route.name === "Orders") {
                iconName = focused ? "list" : "list-outline";
              }

              return (
                <View>
                  <Ionicons name={iconName} size={size} color={color} />
                  {route.name === "Basket" && num > 0 && (
                    <Badge
                      value={num}
                      status="error"
                      containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                    />
                  )}
                </View>
              );
            },
          })}
          tabBarActiveTintColor="lightblue"
          tabBarInactiveTintColor="gray"
          tabBarStyle={{ display: "flex" }}
        >
          <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen name="Basket" component={BasketWithNav} options={{ headerShown: false }} />
          <Tab.Screen name="Orders" component={MyOrdersWithNav} options={{ headerShown: false }} />
          <Tab.Screen name="Profile" component={UserStack} options={{ headerShown: false }} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;