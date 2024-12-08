import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useContext, useEffect, useState } from "react"
import { Alert } from "react-native"

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
})

function AuthProvider({ children }: any) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isFirstAccess, setIsFirstAccess] = useState<boolean>(true);
    const [keepConnected, setKeepConnected] = useState<boolean>(false);

    const [user, setUser] = useState<userType>({ username: "", password: "", name: "" });

    const loadStoredData = async () => {
        // código para resgatar as informações do Local Storage
    } 

    useEffect(() => {
        loadStoredData();
    }, [loadStoredData]);

    const login = async ({ username, password, keepConnected }: loginType) => {
        try {
            const userStored = await AsyncStorage.getItem("@safekey-user");

            if (userStored) {
                const user = JSON.parse(userStored);

                if (username === user.username && password === user.password) {
                    setUser(user);
                    setKeepConnected(keepConnected);
                    setIsAuthenticated(true);

                    await AsyncStorage.setItem("@safekey-keepConnected", JSON.stringify(keepConnected));
                } else {
                    Alert.alert("Login", "Usuário ou senha não coincidem.");
                }
            } else{
                Alert.alert("Login", "Faça um cadastro primeiro.")
            }

        } catch (e) {
            Alert.alert("Login", "Não foi possível logar. Tente novamente mais tarde.");
        }
    }

    const register = async () => {

    }

    const forgotPassword = async () => {

    }

    const logout = async () => {

    }

    const resetData = async () => {

    }

    const editProfile = async () => {

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
