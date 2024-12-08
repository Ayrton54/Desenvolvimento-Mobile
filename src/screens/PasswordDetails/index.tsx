import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/buttons';
import Input from '../../components/inputs/input/Input';
import PasswordInput from '../../components/inputs/PasswordInput/PasswordInput';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutesParams } from '../../navigation/RoutesParams';

type PasswordDetailsScreen = NativeStackNavigationProp<RoutesParams, 'PasswordDetails'>;

export default function PasswordDetailsScreen() {
  const navigation = useNavigation<PasswordDetailsScreen>();
  const route = useRoute();
  const { title } = route.params as { title: string };

  const [passwordDetails, setPasswordDetails] = useState({
    id: '',
    title: '',
    username: '',
    password: '',
    link: '',
    description: '',
  });

  useEffect(() => {
    const loadPasswordDetails = async () => {
      const storedPasswords = await AsyncStorage.getItem('@passwords');
      if (storedPasswords) {
        const passwords = JSON.parse(storedPasswords);
        const currentPassword = passwords.find((pwd: { title: string }) => pwd.title === title);
        if (currentPassword) {
          setPasswordDetails(currentPassword);
        }
      }
    };
    loadPasswordDetails();
  }, [title]);

  const onUpdate = async () => {
    try {
      const storedPasswords = await AsyncStorage.getItem('@passwords');
      let passwords = storedPasswords ? JSON.parse(storedPasswords) : [];
      
      passwords = passwords.map((pwd: { id: string }) =>
        pwd.id === passwordDetails.id ? passwordDetails : pwd
      );
      
      await AsyncStorage.setItem('@passwords', JSON.stringify(passwords));

      Alert.alert('Sucesso', 'Senha atualizada com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.log('Erro ao atualizar a senha:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a senha.');
    }
  };

  const onDelete = async () => {
    try {
      const storedPasswords = await AsyncStorage.getItem('@passwords');
      let passwords = storedPasswords ? JSON.parse(storedPasswords) : [];
      
      passwords = passwords.filter((pwd: { id: string }) => pwd.id !== passwordDetails.id);
      
      await AsyncStorage.setItem('@passwords', JSON.stringify(passwords));

      Alert.alert('Sucesso', 'Senha excluída com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.log('Erro ao excluir a senha:', error);
      Alert.alert('Erro', 'Não foi possível excluir a senha.');
    }
  };

  return (
    <View style={styles.container}>
      <Input
        title="Título"
        placeholder="Título"
        value={passwordDetails.title}
        onChangeText={(text) => setPasswordDetails({ ...passwordDetails, title: text })}
      />
      <Input
        title="Usuário/e-mail"
        placeholder="Usuário/e-mail"
        value={passwordDetails.username}
        onChangeText={(text) => setPasswordDetails({ ...passwordDetails, username: text })}
      />
      <PasswordInput
        placeholder="Senha"
        value={passwordDetails.password}
        onChangeText={(text) => setPasswordDetails({ ...passwordDetails, password: text })}
      />
      <Input
        title="Link"
        placeholder="Link"
        value={passwordDetails.link}
        onChangeText={(text) => setPasswordDetails({ ...passwordDetails, link: text })}
      />
      <Input
        title="Descrição"
        placeholder="Descrição"
        value={passwordDetails.description}
        onChangeText={(text) => setPasswordDetails({ ...passwordDetails, description: text })}
      />

      <View style={styles.buttonContainer}>
        <Button title="Editar" style={styles.editButton} onPress={onUpdate} />
        <Button title="Excluir" style={styles.deleteButton} onPress={onDelete} />
      </View>
    </View>
  );
}
