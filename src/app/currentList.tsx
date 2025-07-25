import { Stack, Link, router } from 'expo-router';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { Container } from '~/src/components/Container';
import { DoodleUnderline } from '~/src/components/DoodleUnderline';
import { Postit } from '~/src/components/Postit';
import { NotebookBackground } from '~/src/components/NotebookBackground';
import { Header } from '~/src/components/Header';
import { DoodleDate } from '~/src/components/DoodleDate';
import { useEffect, useState } from 'react';
import { GroupedProducts, Product } from '~/src/types';
import { groupProductsByCategory } from '~/src/services/lists/currentListService';
import { FlashList } from '@shopify/flash-list';
import { DoodleMarker } from '~/src/components/DoodleMarker';
import { DoodleCheckbox } from '~/src/components/DoodleCheckbox';
import NotebookLine from '../components/NotebookLine';
import useCurrentList from '../hooks/useCurrentList';

export default function CurrentList() {

    const { data: groupedData, loading, categories, toggleItemChecked } = useCurrentList();

    const item = (category: string) => {
        return (
            <View className=''>
                <NotebookLine>
                    <DoodleMarker align='center'>
                        <Text className='doodle-medium text-3xl '>{category}</Text>
                    </DoodleMarker>
                </NotebookLine>
                {groupedData[category].map((product: Product) => (
                    <NotebookLine key={product.id}>
                        <View className='flex-row items-center justify-between w-full'>
                            <Text className='doodle-medium text-4xl'>{product.nome}</Text>
                            <DoodleCheckbox
                                checked={product.checked}
                                onToggle={() => toggleItemChecked(product.id)}
                                checkmarkImage={require('~/src/assets/images/doodle-checkmark.png')}
                            />
                        </View>
                    </NotebookLine>
                ))}

            </View>
        )
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false, statusBarHidden: true }} />
            <Header className='justify-between border-b border-gray-300'>
                <View className='flex-row'>
                    <TouchableOpacity className='px-4' onPress={() => router.back()}>
                        <Text className='doodle-bold text-5xl'>&lt;</Text>
                    </TouchableOpacity>
                    <View className='flex-column'>
                        <Text className='text-4xl doodle'>
                            Lista Atual
                        </Text>
                        <DoodleUnderline />
                    </View>
                </View>
                <DoodleDate />
            </Header>
            <View>
                {loading ? (
                    <View className='px-16'>
                        <ActivityIndicator size="large" />

                    </View>
                ) : (
                    <View className='w-[90%] left-[5%] h-[95%]'>
                        <FlashList
                            data={categories}
                            keyExtractor={(item) => item}
                            estimatedItemSize={50}
                            renderItem={({ item: category }) => (
                                item(category)
                            )}
                            ListFooterComponent={
                                <NotebookLine>
                                    <TextInput
                                        className="py-2 doodle-medium text-3xl"
                                        placeholder="Novo item"
                                        value={('')}
                                        onChangeText={(text) => console.log('typing...')}
                                        onSubmitEditing={() => { console.log('Submit editing') }}
                                        returnKeyType="done"
                                    />
                                </NotebookLine>
                            }
                        />
                    </View>
                )}
            </View>

        </>
    );
}
