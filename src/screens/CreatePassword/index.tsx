import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PasswordInput from '../../components/inputs/PasswordInput/PasswordInput';
import Button from '../../components/buttons';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutesParams } from '../../navigation/RoutesParams';
import keys from '../../mock/Keys'; 
import Input from '../../components/inputs/input/Input';

type CreatePasswordScreenNavigationProp = NativeStackNavigationProp<RoutesParams, 'CreatePassword'>;

// Esquema de validação com Yup
const CreatePasswordSchema = Yup.object().shape({
  username: Yup.string().required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('A senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
    .required('Confirmação de senha é obrigatória'),
});

export default function CreatePasswordScreen() {
  const navigation = useNavigation<CreatePasswordScreenNavigationProp>();

  const handleConfirm = async (values: { username: string; password: string }) => {
    try {
      // Verificar se o usuário existe no mock ou no AsyncStorage
      const userExistsInMock = keys.some((user) => user.username === values.username);
      const storedUsers = await AsyncStorage.getItem('@users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const userExistsInStorage = users.some((user: { username: string }) => user.username === values.username);

      if (!userExistsInMock && !userExistsInStorage) {
        Alert.alert('Erro', 'Usuário não encontrado. Verifique se digitou o e-mail corretamente.');
        return;
      }

      // Atualizar a senha do usuário existente no AsyncStorage
      if (userExistsInStorage) {
        const updatedUsers = users.map((user: { username: string; password: string }) =>
          user.username === values.username ? { ...user, password: values.password } : user
        );
        await AsyncStorage.setItem('@users', JSON.stringify(updatedUsers));
        console.log('Usuários atualizados:', updatedUsers); 
      }

      Alert.alert('Sucesso', 'Senha alterada com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      console.log('Erro ao alterar senha:', error);

      Alert.alert('Erro', 'Não foi possível alterar a senha.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alterar Senha</Text>

      <Formik
        initialValues={{
          username: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={CreatePasswordSchema}
        onSubmit={handleConfirm}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Input
              title='E-mail'
              placeholder="E-mail"
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              error={touched.username ? errors.username : undefined}
            />
            <PasswordInput
              title='Nova Senha'
              placeholder="Nova Senha"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password ? errors.password : undefined}
            />
            <PasswordInput
              title='Confirmar Nova Senha'
              placeholder="Confirmar Nova Senha"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              error={touched.confirmPassword ? errors.confirmPassword : undefined}
            />

            {Object.keys(errors).length > 0 && touched && (
              <Text style={styles.errorText}>
                {errors.username || errors.password || errors.confirmPassword}
              </Text>
            )}

            <View>
              <Button title="Confirmar" onPress={handleSubmit as any} />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
