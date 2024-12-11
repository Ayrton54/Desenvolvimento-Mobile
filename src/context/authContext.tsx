import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

type userType = {
    username: string,
    password: string,
    name: string,
}

type loginType = {
    username: string,
    password: string,
    keepConnected: boolean,
}

type AuthContextType = {
    isAuthenticated: boolean,
    isFirstAccess: boolean,
    keepConnected: boolean,

    user: userType,

    login: ({ }: loginType) => Promise<void>,
    register: (name: string, username: string, password: string) => Promise<void>,
    forgotPassword: (username: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    resetData: () => Promise<void>,
    editProfile: () => Promise<void>,
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isFirstAccess: true,
    keepConnected: false,
    user: { username: "", password: "", name: "" },

    login: async () => { },
    register: async () => { },
    forgotPassword: async () => { },
    logout: async () => { },
    resetData: async () => { },
    editProfile: async () => { },
});

function AuthProvider({ children }: any) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isFirstAccess, setIsFirstAccess] = useState<boolean>(true);
    const [keepConnected, setKeepConnected] = useState<boolean>(false);

    const [user, setUser ] = useState<userType>({ username: "", password: "", name: "" });

    const loadStoredData = async () => {
        try {
            const userStored = await AsyncStorage.getItem("@keymaster-user"); // Alterado para KeyMaster
            if (userStored) {
                const user = JSON.parse(userStored);
                setUser (user);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Erro ao carregar dados armazenados:", error);
        }
    };

    useEffect(() => {
        loadStoredData();
    }, [loadStoredData]);

    const login = async ({ username, password, keepConnected }: loginType) => {
        try {
            const userStored = await AsyncStorage.getItem("@keymaster-user"); // Alterado para KeyMaster

            if (userStored) {
                const user = JSON.parse(userStored);

                if (username === user.username && password === user.password) {
                    setUser (user);
                    setKeepConnected(keepConnected);
                    setIsAuthenticated(true);

                    if (keepConnected) {
                        await AsyncStorage.setItem("@keymaster-keepConnected", 'true'); // Alterado para KeyMaster
                    } else {
                        await AsyncStorage.removeItem("@keymaster-keepConnected"); // Alterado para KeyMaster
                    }
                } else {
                    Alert.alert("Login", "Usuário ou senha não coincidem.");
                }
            } else {
                Alert.alert("Login", "Faça um cadastro primeiro.");
            }
        } catch (e) {
            Alert.alert("Login", "Não foi possível logar. Tente novamente mais tarde.");
        }
    };

    const register = async () => {
        // Implementar a lógica de registro
    }

    const forgotPassword = async () => {
        // Implementar a lógica de recuperação de senha
    }

    const logout = async () => {
        setUser ({ username: "", password: "", name: "" });
        setIsAuthenticated(false);
        await AsyncStorage.removeItem("@keymaster-user"); // Alterado para KeyMaster
        await AsyncStorage.removeItem("@keymaster-keepConnected"); // Alterado para KeyMaster
    };

    const resetData = async () => {
        // Implementar a lógica de reset de dados
    }

    const editProfile = async () => {
        // Implementar a lógica de edição de perfil
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isFirstAccess,
                keepConnected,
                user,
                login,
                register,
                forgotPassword,
                logout,
                resetData,
                editProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;