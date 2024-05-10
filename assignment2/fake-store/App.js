import React from "react";
import { Provider } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import store from "./src/redux/store";
import Home from "./src/screens/Home";
import ListScreen from "./src/screens/List";
import ProductDetail from "./src/screens/ProductDetail";
import Basket from "./src/screens/Basket";

import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import cartSlice from "./src/redux/cartSlice";
import { totalItemsSelector } from "./src/redux/cartSlice"; 

import { Badge } from 'react-native-elements';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="ListScreen" component={ListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
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

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Basket") {
                iconName = focused ? "basket" : "basket-outline";
              }

              return (
                <View>
                  <Ionicons name={iconName} size={size} color={color} />
                  {route.name === "Basket" && num > 0 && (
                    <Badge
                      value={num}
                      color={'red'}
                      containerStyle={{ position: 'absolute', top: -4, right: -4, }}
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
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Basket"
            component={Basket}
            options={{ headerShown: false }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
