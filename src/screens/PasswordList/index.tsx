import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import { RoutesParams } from '../../navigation/RoutesParams';
import keys from '../../mock/Keys';
import { useAuth } from '../../context/authContext';

type PasswordListScreen = NativeStackNavigationProp<RoutesParams, 'PasswordList'>;

export default function PasswordListScreen() {
  const navigation = useNavigation<PasswordListScreen>();
  const [searchText, setSearchText] = useState('');
  const [passwords, setPasswords] = useState([...keys]);
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout(); // Chame a função de logout do contexto de autenticação
    navigation.navigate('Login'); // Redirecione para a tela de login
  };


  useEffect(() => {
    const loadPasswords = async () => {
      const storedPasswords = await AsyncStorage.getItem('@passwords');
      if (storedPasswords) {
        setPasswords([...keys, ...JSON.parse(storedPasswords)]);
      }
    };
    loadPasswords();
  }, []);

  const filteredPasswords = passwords.filter((key) =>
    key.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
    
    <TouchableOpacity onPress={handleLogout}>
  <Text style={styles.logoutButton}>Logout</Text>
</TouchableOpacity>
      <View style={styles.containerSearch}>
        <TextInput
          style={styles.inputSearch}
          placeholder="Pesquisar..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <Feather name="search" size={20} color="#000" style={styles.searchIcon} />
      </View>
      
      <FlatList
        data={filteredPasswords}
        keyExtractor={(item) => item.id.toString()}
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