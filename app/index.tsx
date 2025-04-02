import { Stack, Link } from 'expo-router';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { useAuthStore } from "~/store/auth";
import { View, Text } from "react-native";
export default function Home() {
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();
};
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <Text>teste</Text>
        <Button title="Logout" onPress={handleLogout} testID="button-logout" />
      </Container>
    </>
  );
}
