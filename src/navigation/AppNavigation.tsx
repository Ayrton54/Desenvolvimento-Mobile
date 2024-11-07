// src/navigation/AppNavigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import CreatePasswordScreen from '../screens/CreatePassword';
import RegisterScreen from '../screens/register';
import PasswordListScreen from '../screens/PasswordList';
import NewPasswordScreen from '../screens/NewPassword';
import PasswordDetailsScreen from '../screens/PasswordDetails';

const Stack = createStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} />
                <Stack.Screen name="PasswordList" component={PasswordListScreen} />
                <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
                <Stack.Screen name="PasswordDetails" component={PasswordDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
