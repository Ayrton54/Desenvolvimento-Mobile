// src/screens/newPassword/index.tsx
import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import Input from '../../components/inputs/input/Input';
import styles from './styles';

export default function NewPasswordScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Input placeholder="Título" />
      <Input placeholder="Link" />
      <Input placeholder="Usuário/e-mail" />
      <Input placeholder="Senha" secureTextEntry />
      <Input placeholder="Descrição" />

      <Button title="Salvar" onPress={() => navigation.goBack()} />
      <Button title="Cancelar" onPress={() => navigation.goBack()} />
    </View>
  );
}

