// style.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5', // Light gray background
  },
  titleContainer: {
    marginTop: 50,
    alignItems: 'center',
    backgroundColor: '#2196F3', // Blue background
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff', // White color for text
    fontWeight: 'bold',
  },
  categoriesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  productImage: {
    width: 200, // Adjust image width as needed
    height: 200, // Adjust image height as needed
    marginBottom: 10,
  },
  goBackButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  goBackButtonText: {
    fontSize: 16,
    color: '#fff', // White color for text
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceCountRateContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  scrollContainer: {
    backgroundColor: '#fff', // White background for ScrollView
    padding: 10,
    borderRadius: 5,
  },
  scrollDescription: {
    marginBottom: 20, // Adjust margin as needed
  },
});

export const productDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5', // Light gray background
  },
  titleContainer: {
    marginTop: 50,
    alignItems: 'center',
    backgroundColor: '#2196F3', // Blue background
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff', // White color for text
    fontWeight: 'bold',
  },
  categoriesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  productImage: {
    width: 200, // Adjust image width as needed
    height: 200, // Adjust image height as needed
    marginBottom: 10,
  },
  goBackButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  goBackButtonText: {
    fontSize: 16,
    color: '#fff', // White color for text
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceCountRateContainer: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  scrollContainer: {
    backgroundColor: '#fff', // White background for ScrollView
    padding: 10,
    borderRadius: 5,
  },
  scrollDescription: {
    marginBottom: 20, // Adjust margin as needed
  },
});
