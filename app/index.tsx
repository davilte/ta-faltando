import { Stack, Link } from 'expo-router';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { useAuthStore } from "~/store/auth";
import { View, Text } from "react-native";
import { Image } from 'expo-image';
import { NotebookBackground } from '~/components/NotebookBackground';
import { DoodleUnderline } from '~/components/DoodleUnderline';


export default function Home() {
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false, statusBarHidden: true }} />
      <NotebookBackground />
      <Container>

        <View className='flex-row justify-between items-center'>
          <View className='flex-row items-center'>
            <Image
              source={require('~/assets/images/user.png')}
              contentFit="cover"
              style={{ width: 40, height: 40 }}
            />
            <View className='flex-col ms-2 mx-1'>
              <Text className='doodle text-4xl px-1'>Usuário</Text>
              <DoodleUnderline style={{ marginBottom: -1 }} />
            </View>
          </View>
          <View className=''>
          <Image
              source={require('~/assets/images/date.png')}
              contentFit="cover"
              style={{ width: 100, height: 32 }}
            />
          </View>
        </View>

        {/* <Button title="Logout" onPress={handleLogout} testID="button-logout" /> */}
      </Container>
    </>
  );
}