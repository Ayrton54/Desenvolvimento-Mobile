// src/screens/passwordDetails/index.tsx
import React from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../../components/Button';
import Input from '../../components/inputs/input/Input';
import styles from './styles';

export default function PasswordDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { title } = route.params as { title: string };

  return (
    <View style={styles.container}>
      <Input placeholder="Títulos" value={title} />
      <Input placeholder="Usuário/e-mail" />
      <Input placeholder="Senha" secureTextEntry />
      <Input placeholder="Link" />
      <Input placeholder="Descrição" />

      <Button title="Editar" onPress={() => {}} />
      <Button title="Excluir" onPress={() => navigation.goBack()} />
    </View>
  );
}
