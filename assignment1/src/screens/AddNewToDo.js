import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { ImgButton } from '../components/ImgButton';

let nextId = 1; // Initialize ID counter

export default function AddNewToDoScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleBack = () => {
    navigation.goBack(); 
  };

  const handleSave = () => {
    if (title.trim() !== '' && description.trim() !== '') {
      const id = Date.now() + Math.random(); // Generate unique ID
      console.log("Title:", title);
      console.log("Description:", description);
  
      navigation.navigate('Home', {
        newTodo: { id, title, description }, // Include the generated ID
        message: 'Todo Added Successfully',
      });
  
      setTitle('');
      setDescription('');
    } else {
      Alert.alert('Todo Added Unsuccessful');
    }
  
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add New Todo</Text>
        <View style={styles.headerLine}></View>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          multiline={true}
          value={description}
          onChangeText={text => setDescription(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ImgButton name='backspace' label='Back' navToDo={handleBack} />
        <ImgButton name='save' label='Save' navToDo={handleSave} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, 
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerLine: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginVertical: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  descriptionInput: {
    height: 100, 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
