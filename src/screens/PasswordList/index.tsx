// src/screens/passwordList/index.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/inputs/input/Input';
import styles from './styles';

export default function PasswordListScreen() {
  const navigation = useNavigation();

  const passwords = [
    { id: '1', title: 'Conta Bancária' },
    { id: '2', title: 'Redes Sociais' },
    // Adicione mais itens de exemplo aqui
  ];

  return (
    <View style={styles.container}>
      <Input placeholder="Pesquisar" />

      <FlatList
        data={passwords}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PasswordDetails', { title: item.title })}>
            <Text style={styles.passwordItem}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('NewPassword')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
