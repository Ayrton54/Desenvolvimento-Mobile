import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import PasswordInput from '../../components/inputs/PasswordInput/PasswordInput';
import Button from '../../components/Button';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KeyMaster</Text>

      <TextInput style={styles.input} placeholder="Usuário" />
      <PasswordInput placeholder="Senha" />

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setIsRememberMeChecked(!isRememberMeChecked)}>
          <Feather
            name={isRememberMeChecked ? "check-square" : "square"}
            size={20}
            color={isRememberMeChecked ? "#7F3EF0" : "#D9D9D9"}
          />
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Manter-me conectado</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Acessar" onPress={() => navigation.navigate('PasswordList')} />

      </View>

      {//<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PasswordList')}>
        // <Text style={styles.buttonText}>Acessar</Text>
        //</TouchableOpacity>
      }

      <TouchableOpacity onPress={() => navigation.navigate('CreatePassword')}>
        <Text style={styles.link}>Esqueci a senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}
