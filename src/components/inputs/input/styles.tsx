import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    color: '#333', 
    backgroundColor: '#fff', 
  },

  inputError: {
    borderColor: '#E63946', 
  },

  inputFocused: {
    borderColor: '#007BFF', 
  },

  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4, 
  },

  error: {
    fontSize: 12,
    color: '#E63946',
    marginTop: 4,
  },
});

export default styles;
