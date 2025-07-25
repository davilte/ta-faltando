import { Stack, Link, useRouter } from 'expo-router';
import { Container } from '~/src/components/Container';
import { useAuthStore } from "~/src/store/auth";
import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList } from "react-native";
import { Image } from 'expo-image';
import { NotebookBackground } from '~/src/components/NotebookBackground';
import { DoodleUnderline } from '~/src/components/DoodleUnderline';
import { DoodleDate } from '~/src/components/DoodleDate';
import { DoodleMarker } from '~/src/components/DoodleMarker';
import { Postit } from '~/src/components/Postit';
import { FlashList } from '@shopify/flash-list';
import { Header } from '~/src/components/Header';
import useGroupByMonth from '../hooks/useGroupByMonth';

export default function Home() {
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();
  };
  const router = useRouter();

  const { data: listsByMonth, loading } = useGroupByMonth()
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <Stack.Screen options={{ headerShown: false, statusBarHidden: true }} />
      <NotebookBackground />
      <Header className='justify-between'>
        <View className='flex-row items-center'>
          <TouchableOpacity onPress={handleLogout} testID="button-logout">
            <Image
              source={require('~/src/assets/images/user.png')}
              contentFit="cover"
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
          <View className='flex-col ms-2 mx-1'>
            <Text className='doodle text-4xl px-1'>{user?.name ?? "Usuário"}</Text>
            <DoodleUnderline style={{ marginBottom: -1 }} />
          </View>
        </View>
        <View className=''>
          <DoodleDate />
        </View>
      </Header>
      <Container>


        <View>
          <ImageBackground
            source={require('~/src/assets/images/cart.png')}
            className="w-full h-48 flex items-center justify-start"
            resizeMode="contain"
          >
            <TouchableOpacity className='w-1/2 mt-2' onPress={() => router.navigate('/currentList')} testID="">
              <DoodleMarker align="center"><Text className='doodle text-center text-4xl w-full'>Lista Atual</Text></DoodleMarker>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        {listsByMonth?.length === 0 ? (
          <Text>
            Sem listas anteriores. Clique no carrinho para começar uma nova ou continuar a Lista Atual
          </Text>
        ) : null}


        {loading ? (
          <View className='p-16'>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View className="flex-1 px-4">
            <FlashList
              data={listsByMonth}
              keyExtractor={(item) => item.month}
              estimatedItemSize={200}
              renderItem={({ item }) => (
                <View>
                  {/* Month title + divider */}
                  <View className="flex-row items-center mb-6 mt-10">
                    <Text className="text-3xl doodle-semi-bold">{item.month}</Text>
                    <View className="flex-1 border-b border-neutral-500 ml-4" />
                  </View>

                  {/* Postit cards in a wrap layout */}
                  <View className="flex-row flex-wrap justify-start gap-4">
                    {item.lists.map((lista, index) => (
                      <View key={index} className="w-[45%]">
                        <Postit className="w-full min-h-[150px] p-3">
                          <View className='flex-column justify-between h-full'>
                            <View>
                              <Text className="doodle-semi-bold text-2xl mb-1">{lista.mercado}</Text>
                              {lista.produtos.slice(0, 3).map((produto, i) => (
                                <Text key={i} className="doodle">
                                  • {produto.nome}
                                </Text>
                              ))}
                            </View>
                            <Text className="text-xs doodle mb-2">{lista.data}</Text>
                          </View>
                        </Postit>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            />

          </View>
        )
        }


      </Container>
    </>
  );
}