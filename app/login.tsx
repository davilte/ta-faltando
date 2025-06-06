import { Stack, Link } from 'expo-router';
import { View, Text, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import { Container } from '~/components/Container';
import { Button } from '~/components/Button';
import { useAuthStore } from "~/store/auth";
import { useForm, Controller } from 'react-hook-form'
import { DoodleUnderline } from '~/components/DoodleUnderline';
import { Postit } from '~/components/Postit';


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

    const onSubmit = (data: LoginFormInputs) => {
        console.log(data);
        login();
    };

    const login = useAuthStore((state) => state.login);

    return (
        <>
            <Stack.Screen options={{ headerShown: false, statusBarHidden: true }} />
            <ImageBackground
                source={require('~/assets/images/doodle-background.webp')}
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
                                            <DoodleUnderline />
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
                                            <DoodleUnderline />
                                        </>
                                    )}
                                    name="password"
                                />

                                <ImageBackground
                                    source={require('~/assets/images/doodle-button.png')}
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
                            <DoodleUnderline style={{width: '30%'}} />
                            <Text className='doodle text-xl w-full text-center'>ou</Text>
                            <Text className='text-2xl doodle w-full text-center'>Entrar sem cadastro</Text>
                        </View>
                    </View>

                </Container>
            </ImageBackground>
        </>
    );
}
