import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import CreatePasswordScreen from '../screens/CreatePassword';
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
                <Stack.Screen name="CreatePassword" options={{ headerShown: true }} component={CreatePasswordScreen} />
                <Stack.Screen name="PasswordList" component={PasswordListScreen} />
                <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
                <Stack.Screen name="PasswordDetails" component={PasswordDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
