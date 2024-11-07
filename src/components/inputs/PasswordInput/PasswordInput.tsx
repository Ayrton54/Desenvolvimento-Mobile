// src/components/PasswordInput.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';

type PasswordInputProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
};

export default function PasswordInput({ placeholder, value, onChangeText }: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!isPasswordVisible}
      />
      <TouchableOpacity
        style={styles.icon}
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        <Feather
          name={isPasswordVisible ? 'eye' : 'eye-off'}
          size={20}
          color="#666"
        />
      </TouchableOpacity>
    </View>
  );
}
