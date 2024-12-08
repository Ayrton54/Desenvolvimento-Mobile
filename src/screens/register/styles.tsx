import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA', 
  },
  title: {
    fontSize: 28, 
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#4B3CD6',
    textAlign: 'center', 
  },
  input: {
    width: '100%', 
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8, 
    backgroundColor: '#FFF', 
    fontSize: 16, 
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
});

export default styles;
