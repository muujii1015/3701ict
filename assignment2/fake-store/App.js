import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Category from './src/screens/Category';
import List from './src/screens/List';
import Detail from './src/screens/Detail'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Detail" component={Detail} /> 
      </Stack.Navigator>
    </NavigationContainer> 
  );
};

export default App;
