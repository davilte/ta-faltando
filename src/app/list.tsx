import { Stack, Link } from 'expo-router';
import { Button } from '~/src/components/Button';
import { Container } from '~/src/components/Container';
import { ScreenContent } from '~/src/components/ScreenContent';
import { useAuthStore } from "~/src/store/auth";
import { View, Text } from "react-native";
import { Image } from 'expo-image';

const dados = ['Banana', 'Pêra', 'Maçã', 'Abacaxi'];

export default function List() {
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false, statusBarHidden: true }} />
      <Container>
        <Image
          source={require('~/src/assets/images/user.png')}
          contentFit="cover"
          style={{ width: 50, height: 50 }}
        />
        <Button title="Logout" onPress={handleLogout} testID="button-logout" />
      </Container>
    </>
  );
}
