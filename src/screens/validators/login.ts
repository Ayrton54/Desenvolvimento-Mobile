import {object, string, boolean} from 'yup';


const LoginSchema = object({
    username: string()
        .email("Formato de email inválido.")
        .trim()
        .required("Nome de usuário é obrigatório."),
    password: string()
            .trim()
            .required("Senha é obrigatório."),
    keepConnected: boolean(),
});

export default LoginSchema;