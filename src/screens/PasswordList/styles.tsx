// src/screens/passwordList/styles.tsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  passwordItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#4B3CD6',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  containerSearch: {
    marginTop: 90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 45,
  },
  
  searchIcon: {
    marginLeft: 8,
  },
  
  inputSearch: {
    flex: 1,
    fontSize: 18,
  },

  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor:'#4B3CD6',
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
    borderRadius: 5,
    fontSize: 18,
    fontWeight: 500,
  },
  
});

export default styles;
