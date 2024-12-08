import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import Checkbox from 'expo-checkbox';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutesParams } from '../../navigation/RoutesParams';
import LoginSchema from '../validators/login';
import Input from '../../components/inputs/input/Input';
import Button from '../../components/buttons';
import PasswordInput from '../../components/inputs/PasswordInput/PasswordInput';
import { useAuth } from '../../context/authContext';
import keys from '../../mock/Keys';

type loginParamsList = NativeStackNavigationProp<RoutesParams, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<loginParamsList>();
  const { login } = useAuth();

  const saveCredentials = async (values: { username: string; password: string; keepConnected: boolean }) => {
    try {
      if (values.keepConnected) {
        await AsyncStorage.setItem('@loginCredentials', JSON.stringify(values));
      } else {
        await AsyncStorage.removeItem('@loginCredentials');
      }
    } catch (error) {
      Alert.alert('Erro ao salvar credenciais:', error instanceof Error ? error.message : 'Erro desconhecido');
    }
  };

  const loadCredentials = async (setValues: (values: any) => void) => {
    try {
      const storedCredentials = await AsyncStorage.getItem('@loginCredentials');
      if (storedCredentials) {
        const parsedCredentials = JSON.parse(storedCredentials);
        setValues(parsedCredentials);
      }
    } catch (error) {
      Alert.alert('Erro ao carregar credenciais:', error instanceof Error ? error.message : 'Erro desconhecido');
    }
  };

  const validateUser = async (username: string, password: string) => {
    const user = keys.find((user) => user.username === username && user.password === password);
    if (user) return true;

    try {
      const storedUsers = await AsyncStorage.getItem('@users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      return users.some((user: { username: string; password: string }) => 
        user.username === username && user.password === password);
    } catch (error) {
      console.log('Erro ao validar credenciais:', error);
      Alert.alert('Erro ao validar credenciais:', error instanceof Error ? error.message : 'Erro desconhecido');
    }

    return false;
  };

  const onSubmitting = async (values: { username: string; password: string; keepConnected: boolean }) => {
    const isValidUser = await validateUser(values.username, values.password);
    if (!isValidUser) {
      Alert.alert('Erro', 'Usuário ou senha inválidos.');
      return;
    }

    try {
      await login(values);
      saveCredentials(values);
      navigation.navigate('PasswordList');
    } catch (error) {
      Alert.alert('Erro ao logar:', error instanceof Error ? error.message : 'Erro desconhecido');
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KeyMaster</Text>

      <Formik
        initialValues={{ username: '', password: '', keepConnected: false }}
        validationSchema={LoginSchema}
        onSubmit={onSubmitting}
      >
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, setValues, errors, touched }) => {
          useEffect(() => {
            loadCredentials(setValues); // Carregar credenciais ao montar o componente
          }, []);

          return (
            <View>
              <Input
                title="E-mail"
                placeholder="Seu E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {}}
                autoCapitalize="none"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                error={touched.username ? errors.username : undefined}
              />

              <PasswordInput
                
                placeholder="Sua senha"
                value={values.password}
                onChangeText={handleChange('password')}
              />

              <View style={styles.checkboxContainer}>
                <Checkbox
                  value={values.keepConnected}
                  onValueChange={(value) => setFieldValue('keepConnected', value)}
                  color={values.keepConnected ? "#4B3CD6" : undefined}
                />
                <Text style={styles.checkboxLabel}>Manter-me conectado</Text>
              </View>
              
              <View style={styles.buttonContainer}>
                <Button title="Acessar" onPress={handleSubmit as any} />
              </View>
            </View>
          );
        }}
      </Formik>

      <TouchableOpacity onPress={() => navigation.navigate('CreatePassword')}>
        <Text style={styles.link}>Esqueci a senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}
