import { Stack, Link } from 'expo-router';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { useAuthStore } from "~/store/auth";
import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList } from "react-native";
import { Image } from 'expo-image';
import { NotebookBackground } from '~/components/NotebookBackground';
import { DoodleUnderline } from '~/components/DoodleUnderline';
import { DoodleDate } from '~/components/DoodleDate';
import { DoodleMarker } from '~/components/DoodleMarker';
import { Postit } from '~/components/Postit';
import { getLists } from "../services/listsService";
import { ListaDeCompras } from "../types";
import { useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';

export default function Home() {
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();
  };

  const [lists, setLists] = useState<ListaDeCompras[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await getLists();
        setLists(data);
      } catch (error) {
        console.error("Erro ao carregar listas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

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

        {lists?.length == 0 ? (
          <Text>Sem listas anteriores. Clique no carrinho para começar uma nova ou continuar a Lista Atual</Text>)
          :
          (<></>)}


        {loading ? (
          <View>
            <ActivityIndicator size="large" />
          </View>
        ) : (

          <FlashList
              data={lists}
              renderItem={({ item }) => <Text>{item.data}</Text>}
            />

          // <View>

          //   <View className='flex-row items-center my-8'>
          //     <Text className='text-xl'>Fevereiro</Text>
          //     <View className='border-b flex-1 ms-4'></View>
          //   </View>

          //   <View className='flex-row flex-wrap justify-around'>
          //     <View>
          //       <Postit className='max-w-48'>
          //         <View className='overflow-hidden h-full w-full'>
          //           <Text>ola</Text>
          //           <Text>ola</Text>
          //           <Text>ola</Text>
          //           <Text>ola</Text>
          //           <Text>ola</Text>
          //           <Text>ola</Text>
          //           <Text>ola</Text>
          //           <Text>ola</Text>
          //           <Text>ola</Text>
          //           <Text>ola</Text>
          //           <Text>ola</Text>
          //           <Text>ola</Text>
          //           <Text>ola</Text>
          //           <Text>ola</Text>
          //           <Text>ola</Text>
          //           <Text>ola</Text>
          //         </View>
          //       </Postit>
          //     </View>
          //     <View>
          //       <Postit className='max-w-48'>
          //         <View className='overflow-hidden h-full w-full'>
          //           <Text>xau</Text>
          //           <Text>xau</Text>
          //           <Text>xau</Text>
          //           <Text>xau</Text>
          //           <Text>xau</Text>
          //           <Text>xau</Text>
          //           <Text>xau</Text>
          //           <Text>xau</Text>
          //           <Text>xau</Text>
          //           <Text>xau</Text>
          //           <Text>xau</Text>
          //           <Text>xau</Text>
          //         </View>
          //       </Postit>
          //     </View>
          //   </View>
          // </View>
        )
        }


      </Container>
    </>
  );
}