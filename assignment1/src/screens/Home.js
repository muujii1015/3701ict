import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, FlatList, Alert } from 'react-native';
import { ImgButton } from '../components/ImgButton';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation, route }) {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load todos from AsyncStorage when component mounts
    loadTodos();
  }, []);

  useEffect(() => {
    if (route.params?.newTodo) {
      const newTodo = route.params.newTodo;
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      saveTodos([...todos, newTodo]); // Save updated todos to AsyncStorage
    }
    if (route.params?.message) {
      setMessage(route.params.message);
      Alert.alert(route.params.message);
    }
  }, [route.params?.newTodo, route.params?.message]);

  const navToDo = () => navigation.navigate('AddNewToDo');

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, expanded: !todo.expanded } : todo
      )
    );
    saveTodos(todos); // Save updated todos to AsyncStorage
  };

  const markAsFinished = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, finished: true } : todo
      )
    );
    saveTodos(todos); // Save updated todos to AsyncStorage
  };

  const removeTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
    saveTodos(todos.filter((todo) => todo.id !== id)); // Save updated todos to AsyncStorage
  };

  const renderTodoItem = ({ item }) => (
    <View>
      <Pressable onPress={() => toggleTodo(item.id)}>
        <View style={styles.listitem}>
          <Text style={styles.listItemText}>{item.title}</Text>
          <Text style={styles.expandIcon}>{item.expanded ? '↑' : '↓'}</Text>
        </View>
      </Pressable>
      {item.expanded && (
        <View style={styles.expandedView}>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.controlPanel}>
            {!item.finished && (
              <MaterialIcons
                name="done"
                size={24}
                color="green"
                onPress={() => markAsFinished(item.id)}
              />
            )}
            <MaterialIcons
              name="delete"
              size={24}
              color="red"
              onPress={() => removeTodo(item.id)}
            />
          </View>
        </View>
      )}
    </View>
  );

  // Function to load todos from AsyncStorage
  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos !== null) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  // Function to save todos to AsyncStorage
  const saveTodos = async (updatedTodos) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headertext}>My Todo List</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.body}>
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item, index) => item.id.toString() + index} // Append index to ensure uniqueness
        />
      </View>
      <View style={styles.footer}>
        <ImgButton name="add" label="Add New ToDo" navToDo={navToDo} />
      </View>
    </View>
  );
}

// Styles...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headertext: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
  },
  body: {
    flex: 7,
    alignItems: 'center',
    width: 400,
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#000',
  },
  listitem: {
    width: '100%',
    height: 40,
    backgroundColor: '#3498db',
    borderRadius: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  listItemText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  expandIcon: {
    color: 'green',
    fontSize: 20,
    marginLeft: 10,
  },
  expandedView: {
    backgroundColor: '#5aa6e6',
    borderRadius: 5,
    padding: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  controlPanel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footer: {
    flex: 1.5,
    alignItems: 'center',
  },
});
