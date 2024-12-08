import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';

type PasswordInputProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void
};

export default function PasswordInput({ placeholder, value,onBlur, onChangeText }: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={!isPasswordVisible}
      />
      <TouchableOpacity
        style={styles.icon}
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        <Feather
          name={isPasswordVisible ? 'eye' : 'eye-off'}
          size={22}
          color="#666"
        />
      </TouchableOpacity>


    </View>
  );
}