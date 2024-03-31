import React from 'react';
import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import {ImgButton} from '../components/ImgButton';
export default function AddNewToDoScreen({ navigation }) {
  const handleCancel = () => {
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add New Todo</Text>
        <View style={styles.headerLine}></View>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Title:</Text>
        <TextInput style={styles.input}/>
        <Text style={styles.label}>Description:</Text>
        <TextInput style={[styles.input, styles.descriptionInput]} multiline={true} />
      </View>
      <View style={styles.buttonContainer}>
        <ImgButton name='backspace' label='Cancel' navToDo={handleCancel} />
      < ImgButton name='save' label='Save'  />
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
    marginBottom:50,
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
