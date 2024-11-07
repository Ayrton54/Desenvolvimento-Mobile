import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import styles from './styles';

interface InputProps extends TextInputProps {
  style?: any;
}

export default function Input({ placeholder, secureTextEntry, value, onChangeText, style }: InputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
    />
  );
}
