import { Text, View, StyleSheet , Pressable} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headertext}>My Todo List</Text>
       
        <View style={styles.line}></View>
      </View>
      <View style={styles.body}>
        <View style={styles.listitem}>
            <Text style={styles.listItemText}>Buy Milk</Text>
         </View>
         <View style={styles.listitem}>
            <Text style={styles.listItemText}>Buy Bread</Text>
         </View>
         <View style={styles.listitem}>
            <Text style={styles.listItemText}>Buy Eggs</Text>
         </View>
     
      </View>
      <View style={styles.footer}>
        <View style={styles.line}></View>
        <Pressable style={({ pressed }) => [styles.button,{ backgroundColor: pressed ? 'blue' : '#3498db' }]}  onPress={() => console.log("Button pressed")}>
          <Text style={styles.buttonText}>Add New Todo</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: 'white',
    padding: 20,
  },
  header:{
    flex:2,
    justifyContent:'center',
    alignItems:'center',
  
  },
  headertext:{
    fontSize: 30,
    fontWeight: 'bold',
    padding:10,
  },
  body:{
    flex:7,
  
    alignItems:'center',
  },
  line: {
    width:'100%',
    height: 2, 
    backgroundColor: '#000', 
  },
  listitem: {
    width: '100%',
    height: 40,
    backgroundColor: '#3498db', 
    borderRadius: 5,
    justifyContent: 'center',
   
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  listItemText: {
    color: 'white',
    fontSize: 16, 
  },
  footer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginTop: 30, 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  
});
