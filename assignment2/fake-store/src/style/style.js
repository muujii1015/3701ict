// styles.js
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
  categoryButton: {
    backgroundColor: '#fff', // White background
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2, // Add border
    borderColor: '#2196F3', // Blue border
  },
  categoryButtonText: {
    fontSize: 16,
    color: '#2196F3', // Blue color for text
  },
  productList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  productItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  goBackButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    height:50,
    width: '50%',
  },
  goBackButtonText: {
    fontSize: 16,
    color: '#fff', // White color for text
    fontWeight: 'bold',
  },itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 50, // Adjust width as needed
    height: 50, // Adjust height as needed
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: 'gray',
  },
});
