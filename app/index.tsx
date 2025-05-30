import { Stack, Link } from 'expo-router';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { useAuthStore } from "~/store/auth";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { Image } from 'expo-image';
import { NotebookBackground } from '~/components/NotebookBackground';
import { DoodleUnderline } from '~/components/DoodleUnderline';
import { DoodleDate } from '~/components/DoodleDate';
import { DoodleMarker } from '~/components/DoodleMarker';


export default function Home() {
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();
  };

  const hoje = new Date();
  const dia = hoje.getDate().toString().padStart(2, '0');
  const mes = (hoje.getMonth() + 1).toString().padStart(2, '0'); // meses são 0-indexados
  const ano = hoje.getFullYear().toString();

  return (
    <>
      <Stack.Screen options={{ headerShown: false, statusBarHidden: true }} />
      <NotebookBackground />
      <Container>

        <View className='flex-row justify-between items-center h-14 pb-2'>
          <View className='flex-row items-center'>
            <TouchableOpacity onPress={handleLogout} testID="button-logout">
              <Image
                source={require('~/assets/images/user.png')}
                contentFit="cover"
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>
            <View className='flex-col ms-2 mx-1'>
              <Text className='doodle text-4xl px-1'>Usuário</Text>
              <DoodleUnderline style={{ marginBottom: -1 }} />
            </View>
          </View>
          <View className=''>
            <DoodleDate />
          </View>
        </View>

        <View>
          <ImageBackground
            source={require('~/assets/images/cart.png')}
            className="w-full h-48 flex items-center justify-start"
            resizeMode="contain"
          >
            <TouchableOpacity className='w-1/2 mt-2' onPress={() => console.log("olá")} testID="">
              <DoodleMarker><Text className='doodle text-center text-4xl w-full'>Lista Atual</Text></DoodleMarker>
            </TouchableOpacity>
          </ImageBackground>


        </View>
      </Container>
    </>
  );
}