import React from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/buttons';
import Input from '../../components/inputs/input/Input';
import PasswordInput from '../../components/inputs/PasswordInput/PasswordInput';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutesParams } from '../../navigation/RoutesParams';

// Define a tipagem de navegação
type NewPasswordScreen = NativeStackNavigationProp<RoutesParams, 'NewPassword'>;

// Esquema de validação com Yup
const NewPasswordSchema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  username: Yup.string().email('E-mail inválido').required('O usuário/e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
  description: Yup.string(),
});

export default function NewPasswordScreen() {
  const navigation = useNavigation<NewPasswordScreen>();

  // Função para salvar os dados
  const onSave = async (values: { title: string; link: string; username: string; password: string; description: string }) => {
    try {
      // Recuperar senhas existentes do AsyncStorage
      const storedPasswords = await AsyncStorage.getItem('@passwords');
      const passwords = storedPasswords ? JSON.parse(storedPasswords) : [];

      // Adicionar a nova senha à lista com um ID único
      const newPassword = { id: uuidv4(), ...values, createdAt: new Date().toISOString() };
      passwords.push(newPassword);

      // Salvar a lista atualizada no AsyncStorage
      await AsyncStorage.setItem('@passwords', JSON.stringify(passwords));

      // Exibir alerta de sucesso
      Alert.alert('Sucesso', 'Nova senha salva com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('PasswordList') },
      ]);
    } catch (error) {
      console.log('Erro ao salvar a senha:', error);
      Alert.alert('Erro', 'Não foi possível salvar a senha.');
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          title: '',
          link: '',
          username: '',
          password: '',
          description: '',
        }}
        validationSchema={NewPasswordSchema}
        onSubmit={onSave}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Input
              title="Título"
              placeholder="Título"
              value={values.title}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              error={touched.title ? errors.title : undefined}
            />

            <Input
              title="E-mail"
              placeholder="E-mail"
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              error={touched.username ? errors.username : undefined}
              keyboardType="email-address"
            />

            <PasswordInput
              title="Senha"
              placeholder="Senha"
              onChangeText={handleChange('password')}
              value={values.password}
              onBlur={handleBlur('password')}
              error={touched.password ? errors.password : undefined}
            />
            <Input
              title="Descrição"
              placeholder="Descrição"
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              error={touched.description ? errors.description : undefined}
            />

            <View style={styles.buttonContainer}>
              <Button title="Salvar" onPress={handleSubmit as any} style={styles.saveButton} />
              <Button title="Cancelar" onPress={() => navigation.goBack()} style={styles.cancelButton} />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
