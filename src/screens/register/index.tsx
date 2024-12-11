import React, { useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
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
import bcrypt from 'bcryptjs';



type RegisterParamsList = NativeStackNavigationProp<RoutesParams, 'Register'>;

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
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values: { email: string; fullName: string; password: string }) => {
    setLoading(true);
    try {
      const storedUsers = await AsyncStorage.getItem('@users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(values.password, salt);

      const newUser = {
        id: uuidv4(),
        username: values.email,
        fullName: values.fullName,
        password: hashedPassword,
      };
      users.push(newUser);

      await AsyncStorage.setItem('@users', JSON.stringify(users));

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      console.log('Erro ao cadastrar usuário:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o usuário.');
    } finally {
      setLoading(false); // Certifique-se de parar o carregamento, independentemente do resultado
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
              title="E-mail"
              style={styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email ? errors.email : undefined}
              keyboardType="email-address"
            />
            <Input
              title="Nome Completo"
              style={styles.input}
              placeholder="Nome Completo"
              value={values.fullName}
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              error={touched.fullName ? errors.fullName : undefined}
            />
            <PasswordInput
              title="Senha"
              placeholder="Senha"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password ? errors.password : undefined}
            />
            <PasswordInput
              title="Confirmar Senha"
              placeholder="Confirmar Senha"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              error={touched.confirmPassword ? errors.confirmPassword : undefined}
            />
            <Button title="Cadastrar" onPress={handleSubmit as any} />
            {loading && <ActivityIndicator size="large" color="#4B3CD6" />}
          </View>
        )}
      </Formik>
    </View>
  );
}
