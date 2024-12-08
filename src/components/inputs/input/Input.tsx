import React, { forwardRef } from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';
import styles from './styles';

interface InputProps extends TextInputProps {
  title: string;
  error?: string;
}

const Input = forwardRef<TextInput, InputProps>(({ title, error, ...props }, ref) => {
  return (
    <View >
      <Text >{title}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        {...props}
        ref={ref} 
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
});

export default Input;
