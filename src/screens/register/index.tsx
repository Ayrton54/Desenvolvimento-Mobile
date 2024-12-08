import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';

import PasswordInput from '../../components/inputs/PasswordInput/PasswordInput';
import styles from './styles';
import Input from '../../components/inputs/input/Input';
import Button from '../../components/buttons';
import { RoutesParams } from '../../navigation/RoutesParams';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { v4 as uuidv4 } from 'uuid';

type RegisterParamsList = NativeStackNavigationProp<RoutesParams, 'Register'>;

// Esquema de validação com Yup
const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
  fullName: Yup.string().required('O nome completo é obrigatório'),
  password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
    .required('A confirmação de senha é obrigatória'),
});

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterParamsList>();

  const handleRegister = async (values: { email: string; fullName: string; password: string }) => {
    try {
      // Recuperar usuários existentes do AsyncStorage
      const storedUsers = await AsyncStorage.getItem('@users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Adicionar o novo usuário à lista com um ID único
      const newUser = {
        id: uuidv4(),
        username: values.email, 
        fullName: values.fullName,
        password: values.password,
      };
      users.push(newUser);

      // Salvar a lista atualizada no AsyncStorage
      await AsyncStorage.setItem('@users', JSON.stringify(users));

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      console.log('Erro ao cadastrar usuário:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      
      <Formik
        initialValues={{
          email: '',
          fullName: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Input
              title='E-mail'
              style={styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email ? errors.email : undefined}
              keyboardType="email-address"
            />
            <Input
              title='Nome Completo'
              style={styles.input}
              placeholder="Nome Completo"
              value={values.fullName}
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              error={touched.fullName ? errors.fullName : undefined}
            />
            <PasswordInput
              placeholder="Senha"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password ? errors.password : undefined}
            />
            <PasswordInput
              placeholder="Confirmar Senha"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              error={touched.confirmPassword ? errors.confirmPassword : undefined}
            />
            <Button title="Cadastrar" onPress={handleSubmit as any} />
          </View>
        )}
      </Formik>
    </View>
  );
}
