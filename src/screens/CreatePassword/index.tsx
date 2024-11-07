// src/screens/createPassword/index.tsx
import React from 'react';
import { View, Text, TextInput,  TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PasswordInput from '../../components/inputs/PasswordInput/PasswordInput';
import Button from '../../components/Button';
import styles from './styles';

export default function CreatePasswordScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar senha</Text>

      <TextInput style={styles.input} placeholder="Usuário" />
      <PasswordInput placeholder="Senha" />

      <PasswordInput placeholder="Confirmar Senha" />

      <View style={styles.buttonContainer}> 
      <Button title="Confirmar" onPress={() => navigation.navigate('Login')} />
     </View>

    </View>

    
  );
}
