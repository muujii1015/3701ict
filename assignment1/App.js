import { NavigationContainer } from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack'

import Home from './src/screens/Home';

import AddNewToDo from './src/screens/AddNewToDo';


const Stack = createStackNavigator()


export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component ={Home}/>
            <Stack.Screen name="AddNewToDo" component ={AddNewToDo}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

