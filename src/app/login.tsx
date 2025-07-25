import { Stack, Link } from 'expo-router';
import { View, Text, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import { Container } from '~/src/components/Container';
import { Button } from '~/src/components/Button';
import { useAuthStore } from "~/src/store/auth";
import { useForm, Controller } from 'react-hook-form'
import { DoodleUnderline } from '~/src/components/DoodleUnderline';
import { Postit } from '~/src/components/Postit';
import { loginRequest } from "~/src/services/auth/authService";
import { LoginDTO } from "~/src/types/auth";

type LoginFormInputs = {
    email: string;
    password: string;
};

export default function LoginScreen() {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginDTO) => {
        try {
            const result = await loginRequest(data);
            login(result.token, result.user); // store everything
        } catch (err: any) {
            console.error("Erro no login", err.message);
        }
    };

    const login = useAuthStore((state) => state.login);

    return (
        <>
            <Stack.Screen options={{ headerShown: false, statusBarHidden: true }} />
            <ImageBackground
                source={require('~/src/assets/images/doodle-background.webp')}
                className="flex-1"
                resizeMode="cover"
                imageStyle={{ opacity: 0.1 }}
            >
                <Container>
                    <View className='flex-1 justify-around items-center'>
                        <View className='w-full'>
                            <Text className='text-5xl text-center doodle'>Tá Faltando!</Text>
                        </View>
                        <Postit className='w-full'>
                            <View className='flex-1 justify-center items-start p-16'>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <>
                                            <Text className='doodle text-4xl w-full -mb-2'>Email:</Text>
                                            <TextInput
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                className='doodle text-4xl w-full'
                                                testID="input-email"
                                            />
                                            <DoodleUnderline style={{ marginBottom: 16 }} />
                                        </>
                                    )}
                                    name="email"
                                />
                                {errors.email && <Text>This is required.</Text>}

                                <Controller
                                    control={control}
                                    rules={{
                                        maxLength: 100,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <>
                                            <Text className='doodle text-4xl w-full -mb-2'>Senha:</Text>
                                            <TextInput
                                                secureTextEntry={true}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                className='doodle text-4xl w-full'
                                                testID="input-password"
                                            />
                                            <DoodleUnderline style={{ marginBottom: 16 }} />
                                        </>
                                    )}
                                    name="password"
                                />

                                <ImageBackground
                                    source={require('~/src/assets/images/doodle-button.png')}
                                    className="p-3 self-end"
                                    resizeMode="contain"
                                >
                                    <TouchableOpacity onPress={handleSubmit(onSubmit)} testID="button-login">
                                        <Text className='doodle text-4xl'>Entrar</Text>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                        </Postit>
                        <View className='items-center w-full '>
                            <Text className='text-2xl doodle w-full text-center'>Cadastrar-se</Text>
                            <DoodleUnderline style={{ width: '30%', marginBottom: 16 }} />
                            <Text className='doodle text-xl w-full text-center'>ou</Text>
                            <Text className='text-2xl doodle w-full text-center'>Entrar sem cadastro</Text>
                        </View>
                    </View>

                </Container>
            </ImageBackground>
        </>
    );
}
