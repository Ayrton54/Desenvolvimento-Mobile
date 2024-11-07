import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PasswordInput from '../../components/inputs/PasswordInput/PasswordInput';
import styles from './styles';
import Input from '../../components/inputs/input/Input';
import Button from '../../components/Button';

export default function RegisterScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      
      <Input style={styles.input} placeholder="Usuário" />
      <Input style={styles.input} placeholder="Nome Completo"  />
      <PasswordInput placeholder="Senha" />
      <PasswordInput placeholder="Confirmar Senha" />
      <Button title="Cadastrar" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
