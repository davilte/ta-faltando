import { Stack, Link } from 'expo-router';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { useAuthStore } from "~/store/auth";
import { View, Text } from "react-native";
import { Image } from 'expo-image';
import { FlashList } from '@shopify/flash-list';

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
          source={require('~/assets/images/user.png')}
          contentFit="cover"
          style={{ width: 50, height: 50 }}
        />
        <Button title="Logout" onPress={handleLogout} testID="button-logout" />
      </Container>
    </>
  );
}
